import React from "react";

const NftPopup = ({ nftDetails, active, setActive }) => {
  return (
    <>
      <div
        className={active ? "nftPop active" : "nftPop"}
        onClick={() => setActive(false)}
      >
        <div className="nftPopCard">
          <img src={nftDetails.image} alt={nftDetails.title} />
          <h5> {nftDetails.title} </h5>
          <h4> {nftDetails.contractName} </h4>
          <p> {nftDetails.description} </p>
          <h6> {nftDetails.price} ETH </h6>
          <p> {nftDetails.lastUpdate} </p>
        </div>
      </div>
    </>
  );
};

export default NftPopup;
