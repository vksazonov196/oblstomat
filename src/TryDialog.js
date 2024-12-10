function TryDialog({ setShowTryDialog, openedCount, filepath }) {
  return (
    <div className="w-80 md:w-96 lg:w-1/3 xl:w-1/4 flex flex-col justify-center items-center bg-white rounded-md shadow-md p-8 animate-scaleIn">
      <img
        src={`${filepath}tick.png`}
        alt="box"
        className="mx-auto mb-4 shakeDialog h-20"
      />

      <p className="text-center mb-4">
        Вибачте, цей подарунок порожній! У вас залишилось {3 - openedCount}{" "}
        спроб. Удачі!
      </p>
      <button
        onClick={() => setShowTryDialog(false)}
        className="button-color text-white font-semibold py-2 px-4 w-[90px] rounded"
      >
        OK
      </button>
    </div>
  );
}

export default TryDialog;
