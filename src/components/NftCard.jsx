import React from "react";
import { MdOutlineOpenInBrowser } from "react-icons/md";

const NftCard = ({ Nft, index, onClick }) => {
  const shortenText = (text, length) => {
    return text
      ? `${text.substring(0, length)} ${text.length > length ? "..." : ""}`
      : text;
  };

  return (
    <>
      <div className="nftItem">
        <img src={Nft.image} alt={Nft.title} />
        <h4 onClick={() => onClick(index)}> {shortenText(Nft.title, 12)} </h4>
        <p>
          <label> {shortenText(Nft.contractName, 8)} </label>
          <span onClick={() => onClick(index)}>
            View <MdOutlineOpenInBrowser />
          </span>
        </p>
      </div>
    </>
  );
};

export default NftCard;
