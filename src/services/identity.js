import debounce from "lodash.debounce";
import { identityChainMap } from "@osn/constants";
import { Deferred, encodeNetworkAddress } from "../utils";

const cachedIdentities = new Map();
let pendingQueries = new Map();

const delayQuery = debounce((identityServerHost, fetchOptions) => {
  const pending = pendingQueries;
  if (pending.size < 1) {
    return;
  }
  pendingQueries = new Map();

  const chainAddresses = {};
  const idNames = [...pending.keys()];
  const idNameSplits = idNames.map((item) => item.split("/"));
  for (const [chain, address] of idNameSplits) {
    if (!chainAddresses[chain]) {
      chainAddresses[chain] = [];
    }
    chainAddresses[chain].push(address);
  }

  for (const chain in chainAddresses) {
    const addresses = chainAddresses[chain];

    const headers = {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json;charset=UTF-8",
    };

    fetch(`${identityServerHost}/${chain}/short-ids`, {
      ...fetchOptions,
      headers,
      method: "POST",
      body: JSON.stringify({ addresses }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        const identities = new Map(data.map((item) => [item.address, item]));

        for (const [idName, deferred] of pending) {
          const [chainOfIdName, addrOfIdName] = idName.split("/");
          if (chainOfIdName !== chain) {
            continue;
          }
          const identity = identities.get(addrOfIdName) || null;
          cachedIdentities.set(idName, identity);
          deferred.resolve(identity);
        }
      })
      .catch(() => {
        for (const [idName, deferred] of pending) {
          const [chainOfIdName] = idName.split("/");
          if (chainOfIdName !== chain) {
            continue;
          }
          deferred.reject();
        }
      });
  }
}, 0);

export function createFetchIdentity(
  identityServerHost = "https://id.statescan.io",
) {
  /**
   * @param {RequestInit} fetchOptions
   */
  return async function fetchIdentity(chain, address, fetchOptions = {}) {
    const targetChain = identityChainMap[chain] || chain;
    const targetAddress = encodeNetworkAddress(address, targetChain);
    const idName = `${targetChain}/${targetAddress}`;
    if (cachedIdentities.has(idName)) {
      return cachedIdentities.get(idName);
    }

    const pending = pendingQueries;

    if (!pending.has(idName)) {
      pending.set(idName, new Deferred());
      delayQuery(identityServerHost, fetchOptions);
    }

    return await pending.get(idName).promise;
  };
}
