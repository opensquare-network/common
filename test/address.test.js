import { test, expect } from "vitest";
import {
  addressEllipsis,
  encodeNetworkAddress,
  isSamePublicKey,
} from "../src/utils/address";
import { getAddressLink } from "../src/utils/blockExplorer";

test("addressEllipsis", () => {
  expect(addressEllipsis("hahaxxxxxxxxxhoho")).toBe(`haha...hoho`);
});

test("encodeNetworkAddress", () => {
  expect(
    encodeNetworkAddress(
      "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
      "westend",
    ),
  ).toBe(`5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN`);
  expect(
    encodeNetworkAddress(
      "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
      "polkadot",
    ),
  ).toBe(`12YLxZF64jrcHjcXxMDdYMzVXsusfb9dg4fNgpR56AtWecqT`);
});

test("isSamePubKey", () => {
  expect(
    isSamePublicKey(
      "E7fUYKtqKc4brRTmQygJAXLprCTmxQg3wmdvBhg1t5VDLcw",
      "12YLxZF64jrcHjcXxMDdYMzVXsusfb9dg4fNgpR56AtWecqT",
    ),
  ).toBe(true);
  expect(
    isSamePublicKey(
      "E7fUYKtqKc4brRTmQygJAXLprCTmxQg3wmdvBhg1t5VDLcw",
      "Fvk5NrmiD2vhMVAb1cShi3ngHqbjbZwDkxCV4rc7s567JCL",
    ),
  ).toBe(false);
});

test("getAddressLink", () => {
  expect(
    getAddressLink("ethereum", "0x04D3C3168af796bf898036A4d4d6DDBa0A1F0164"),
  ).toBe(
    "https://etherscan.io/address/0x04D3C3168af796bf898036A4d4d6DDBa0A1F0164",
  );
});
