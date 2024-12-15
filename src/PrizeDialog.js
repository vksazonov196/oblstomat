function PrizeDialog({ item, setShowPrizeDialog, setShowForm, filepath }) {
  return (
    <div className="w-80 md:w-96 lg:w-1/3 xl:w-1/4 flex flex-col justify-center items-center bg-white rounded-md shadow-md p-8 animate-scaleIn">
      <img
        src={`${filepath}prize.png`}
        alt="Main product"
        className="max-w-[150px] z-[49] mb-2"
      />
      <h2 className="font-semibold text-xl text-neutral-700 text-center mb-4">
      Вітаємо! Ви виграли!
      </h2>
      <p className="text-center font-semibold mb-4">Ви виграли Знижку 10% на лікування!</p>
      <p className="text-center mb-4">
        1. Натисніть «OK», щоб перейти на сторінку подання.
      </p>
      <p className="text-center mb-4">
        2. Заповніть форму, щоб отримати свою {item}.
      </p>
      <p className="text-center mb-4">
        3. Протягом 24 годин ми зв'яжемося з вами, щоб підтвердити вашу участь.
      </p>
      <button
        onClick={() => {
          setShowPrizeDialog(false);
          setShowForm(true);
        }}
        className="button-color text-white font-semibold py-2 px-4 w-[90px] rounded"
      >
        OK
      </button>
    </div>
  );
}

export default PrizeDialog;
