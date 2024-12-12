import React, { useState, useEffect } from "react";
import FirstDialog from "./FirstDialog";
import TryDialog from "./TryDialog";
import PrizeDialog from "./PrizeDialog";
import Form from "./Form";
import FaqPanel from "./FaqPanel";
import Clarity from '@microsoft/clarity';

function PrizePage({
  item,
  price,
  country,
  filepath,
  faqOpen,
  setFaqOpen,
  fullPrice,
  staticPrefix,
  countryCode,
  company,
}) {
  const [openedBoxes, setOpenedBoxes] = useState(Array(12).fill(false));
  const [openedCount, setOpenedCount] = useState(0);
  const [thirdId, setThirdId] = useState(null);
  const [showFirstDialog, setShowFirstDialog] = useState(true);
  const [showTryDialog, setShowTryDialog] = useState(false);
  const [showPrize, setShowPrize] = useState(false);
  const [showPrizeDialog, setShowPrizeDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showForm) {
      Clarity.tag('form-page');
    }
  }, [showForm]);

  const handleClick = (index) => {
    if (!openedBoxes[index] && openedCount < 3 && !isDialogOpen) {
      const updatedBoxes = [...openedBoxes];
      updatedBoxes[index] = true;
      setOpenedBoxes(updatedBoxes);
      setOpenedCount(openedCount + 1);
      setIsDialogOpen(true);

      if (openedCount === 2) {
        setTimeout(() => {
          setThirdId(index);
        }, 500);
        setTimeout(() => {
          setShowPrize(true);
        }, 1000);
        setTimeout(() => {
          setShowPrizeDialog(true);
        }, 1500);
      } else {
        setTimeout(() => {
          setShowTryDialog(true);
        }, 1000);
      }
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const boxes = Array.from({ length: isSmallScreen ? 9 : 12 }, (_, i) => {
    const isOpened = openedBoxes[i];
    const box01Class = isOpened ? "move-up-lg" : "";
    const box04Class = isOpened && i === thirdId ? "move-up-lg" : "";
    return (
      <div
        id={i}
        className="relative cursor-pointer shake"
        key={i}
        onClick={() => handleClick(i)}
      >
        <div className={`absolute z-[15] ${box01Class}`}>
          <img src={`${filepath}box-2.png`} alt="Box Tapa" />
        </div>
        <div className="absolute">
          <img src={`${filepath}box-3.png`} alt="Box Trasera" />
        </div>
        <div className={`absolute left-[40%] top-[50%]  ${box04Class}`}>
          <img
            src={`${filepath}prize.png`}
            className=" sm:h-4 sm:w-7 h-3 w-6"
            alt="Box Gift"
          />
        </div>
        <div className="relative">
          <img src={`${filepath}box-4.png`} alt="Box" />
        </div>
      </div>
    );
  });

  return (
    <>
      {showForm ? (
        <Form
          item={item}
          price={price}
          country={country}
          filepath={filepath}
          faqOpen={faqOpen}
          setFaqOpen={setFaqOpen}
          staticPrefix={staticPrefix}
          fullPrice={fullPrice}
          countryCode={countryCode}
          company={company}
        />
      ) : (
        <div className="w-full h-full flex justify-center">
          {showPrize && (
            <img
              src={`${filepath}prize.png`}
              alt="Main product"
              className="absolute max-w-[300px] z-[49] mb-2 animate-rotate"
            />
          )}
          {showPrizeDialog && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <PrizeDialog
                item={item}
                filepath={filepath}
                setShowPrizeDialog={(value) => {
                  setShowPrizeDialog(value);
                  closeDialog();
                }}
                setShowForm={setShowForm}
              />
            </div>
          )}
          {showTryDialog && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <TryDialog
                filepath={filepath}
                setShowTryDialog={(value) => {
                  setShowTryDialog(value);
                  closeDialog();
                }}
                openedCount={openedCount}
              />
            </div>
          )}
          {showFirstDialog && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <FirstDialog
                filepath={filepath}
                setShowFirstDialog={(value) => {
                  setShowFirstDialog(value);
                  closeDialog();
                }}
                item={item}
              />
            </div>
          )}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 max-w-[800px] mt-5 p-4">
            {boxes}
          </div>
          <button
            className="absolute bottom-4 right-4"
            onClick={() => setFaqOpen(true)}
          >
            <img src={`${filepath}faq.svg`} alt="faq" />
          </button>
          <FaqPanel
            faqOpen={faqOpen}
            setFaqOpen={setFaqOpen}
            price={price}
            filepath={filepath}
          />
        </div>
      )}
    </>
  );
}

export default PrizePage;
