import React, { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import "./App.css";
import { BsFillSearchHeartFill } from "react-icons/bs";
import NftCard from "./components/NftCard";
import NftPopup from "./components/NftPopup";

const App = () => {
  const [searchedNfts, setSearchedNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedNft, setSelectedNft] = useState({
    name: "",
    description: "",
    contractName: "",
    image: "",
    price: "",
    lastUpdate: "",
  });
  const [popActive, setPopActive] = useState(false);

  const config = {
    apiKey: "CZMERALEKUAzmBXftWe5B8me4t-SF0Ah",
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);

  const searchNft = async () => {
    setIsLoading(true);

    const tempNftStore = [];

    try {
      const nfts = await alchemy.nft.getNftsForOwner(walletAddress);

      const allNfts = nfts.ownedNfts;

      allNfts.forEach((Nft) => {
        tempNftStore.push({
          title: Nft.rawMetadata.name,
          description: Nft.rawMetadata.description,
          image: Nft.media[0]?.thumbnail,
          contractName: Nft.contract.name,
          lastUpdate: Nft.timeLastUpdated,
          price: Nft.contract.openSea?.floorPrice,
        });
      });
    } catch (err) {
      console.log(err);
    }
    setSearchedNfts(tempNftStore);
    setIsLoading(false);
  };

  const switchSelected = (id) => {
    setSelectedNft(searchedNfts[id]);
    setPopActive(true);
  };

  return (
    <>
      <NftPopup
        nftDetails={selectedNft}
        active={popActive}
        setActive={setPopActive}
      />
      <div className="nftBody">
        <div className="topHeader">
          <BsFillSearchHeartFill />
          <p> AlturaTask </p>
        </div>
        <div className="nftSearch">
          <input
            placeholder={"Enter Your Wallet Address"}
            value={walletAddress}
            onInput={(e) => setWalletAddress(e.target.value)}
          />
          <button onClick={searchNft}>
            <BsFillSearchHeartFill /> <span>Search</span>
          </button>
        </div>
        <div className="nftList">
          {isLoading ? (
            <p> Searching For Your NFTs. Wait A Minute.... </p>
          ) : searchedNfts.length < 1 ? (
            <p> Wow, Your Address Has No NFTs. Sorry... </p>
          ) : (
            searchedNfts.map((Nft, index) => (
              <NftCard
                Nft={Nft}
                key={index}
                index={index}
                onClick={switchSelected}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default App;
