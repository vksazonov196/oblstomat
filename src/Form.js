import { useState } from "react";
import FaqPanel from "./FaqPanel";

export default function Form({
  item,
  price,
  country,
  filepath,
  faqOpen,
  setFaqOpen,
  fullPrice,
  countryCode,
  staticPrefix,
  company,
}) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [post, setPost] = useState("");
  const [town, setTown] = useState("");
  const [eMail, setEMail] = useState("");
  const [isTicked, setIsTicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const maxNumberAmount = 10;
  const accept =
    "Я приймаю політику конфіденційності та обробку персональних даних.";

  const handleChangeNumber = (e) => {
    const inputNumber = e.target.value;
    if (inputNumber.startsWith(staticPrefix)) {
      const updatedNumber = inputNumber.slice(staticPrefix.length);
      if (
        /^\d*$/.test(updatedNumber) &&
        updatedNumber.length <= maxNumberAmount
      ) {
        setNumber(updatedNumber);
      }
    }
  };

  const handleChangeName = (e) => {
    const filteredValue = e.target.value.replace(/[0-9]/g, "");
    setName(filteredValue);
  };

  const handleChangeSurname = (e) => {
    const filteredValue = e.target.value.replace(/[0-9]/g, "");
    setSurname(filteredValue);
  };

  const handleChangePost = (e) => {
    setPost(e.target.value);
  };

  const handleChangeTown = (e) => {
    setTown(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEMail(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsTicked(!isTicked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const numberFull = staticPrefix + number;
    if (numberFull.length <= staticPrefix.length) {
      alert("Please enter a valid phone number.");
      setIsLoading(false);
      return;
    }

    const data = {
      Title: item,
      Name: name,
      Country: country,
      Surname: surname,
      Phone: numberFull,
      Email: 'no email',
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxd6dJkOn_wGWqRcwnU_bH7zpBxzos414_pb9V3NwoTAq1otIq_hjRrXEDYRA56MaMV/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "no-cors",
        }
      );
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the form.");
    }

    const redirectUrl = `https://oblstomat.zp.ua/`;
    window.location.href = redirectUrl;
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="justify-center gap-2 flex flex-col lg:flex-row">
        <div className="lg:order-first order-last flex-col bg-white px-[40px] py-[30px] shadow-md sm:w-full lg:w-[30%]">
          <div className="flex justify-center items-start mb-2">
            <p className="text-2xl font-semibold">Створення форми</p>
            <img src={`${filepath}lock.svg`} alt="lock" className="h-9" />
          </div>
          <div className="flex justify-center items-center mb-4">
            <div className="flex mr-2">
              {[...Array(4)].map((_, index) => (
                <svg
                  key={index}
                  className="h-4 w-4 text-yellow-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568L24 9.423l-6 5.856 1.416 8.241L12 18.902 4.584 23.52 6 15.279 0 9.423l8.332-1.268L12 .587z" />
                </svg>
              ))}
              <svg
                className="h-4 w-4 text-gray-300 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568L24 9.423l-6 5.856 1.416 8.241L12 18.902 4.584 23.52 6 15.279 0 9.423l8.332-1.268L12 .587z" />
                <path
                  d="M12 .587L8.332 8.155 0 9.423l6 5.856L4.584 23.52 12 18.902V.587z"
                  className="text-yellow-500 fill-current"
                />
              </svg>
            </div>
            <p className="text-sm">(1246 Комментарів)</p>
          </div>
          <div className="flex-col">
            <div className="flex flex-col mb-2">
              <div className="flex justify-between gap-2">
                <div className="relative w-[50%]">
                  <input
                    value={name}
                    type="text"
                    autoComplete="given-name"
                    name="given-name"
                    required
                    onChange={handleChangeName}
                    placeholder="Ім'я"
                    className="border p-1 rounded-sm w-full focus:outline-none focus:ring-indigo-500"
                  />
                </div>
                <div className="relative w-[50%]">
                  <input
                    value={surname}
                    type="text"
                    onChange={handleChangeSurname}
                    autoComplete="family-name"
                    name="family-name"
                    placeholder="Прізвище"
                    required
                    className="border p-1 rounded-sm w-full focus:outline-none focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            {/* <div className="relative mb-2">
              <input
                value={address}
                type="text"
                onChange={handleChangeAddress}
                autoComplete="street-address"
                name="street-address"
                required
                placeholder="Адреса"
                className="border p-1 rounded-sm w-full focus:outline-none focus:ring-indigo-500"
              />
            </div> */}
            {/* <div className="flex justify-between gap-2 mb-2">
              <div className="relative w-[50%]">
                <input
                  value={post}
                  type="text"
                  onChange={handleChangePost}
                  placeholder="Поштовий індекс"
                  autoComplete="postal-code"
                  name="postal-code"
                  required
                  className="border p-1 rounded-sm w-full focus:outline-none focus:ring-indigo-500"
                />
              </div>
              <div className="relative w-[50%]">
                <input
                  value={town}
                  type="text"
                  onChange={handleChangeTown}
                  placeholder="Місто"
                  autoComplete="address-level2"
                  name="city"
                  required
                  className="border p-1 rounded-sm w-full focus:outline-none focus:ring-indigo-500"
                />
              </div>
            </div> */}
            {/* <select
              name="country"
              autoComplete="country"
              className="border mb-2 p-1 rounded-sm w-full focus:outline-none focus:ring-indigo-500"
            >
              <option>Україна</option>
            </select> */}
            <div className="flex mb-2 relative">
              <div className="bg-gray-300 flex justify-center items-center sm:w-[7%] w-[10%] border rounded-sm">
                <img src={`${filepath}flag.png`} alt="flag" className="h-3" />
              </div>
              <input
                value={staticPrefix + number}
                type="tel"
                onChange={handleChangeNumber}
                required
                autoComplete="tel"
                name="telephone"
                className="border-t border-b border-r p-1 rounded-sm w-[93%] focus:outline-none focus:ring-indigo-500"
              />
            </div>
            {/* <div className="relative mb-2">
              <input
                value={eMail}
                type="email"
                required
                onChange={handleChangeEmail}
                placeholder="E-mail"
                autoComplete="email"
                name="email"
                className="border p-1 rounded-sm w-full focus:outline-none focus:ring-indigo-500"
              />
            </div> */}
            <label className="flex items-center mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isTicked}
                onChange={handleCheckboxChange}
                className="mr-2 cursor-pointer"
              />
              <p className="underline text-xs">{accept}</p>
            </label>
            <button
              disabled={!isTicked || number.length <= 6 || isLoading}
              type="submit"
              className="w-full bg-blue-900 mb-4 text-white cursor-pointer disabled:bg-gray-500 disabled:cursor-default font-semibold p-1 border rounded-md"
            >
              {isLoading ? (
                <img
                  src={`${filepath}spinner.svg`}
                  alt="Spinner"
                  className="w-5 mx-auto"
                />
              ) : (
                "Відправити"
              )}
            </button>
            <div className="flex gap-6 justify-center">
              <div className="flex-col justify-center items-center">
                <img
                  src={`${filepath}support.svg`}
                  alt="support"
                  className="mx-auto"
                />
                <p className="text-xs font-semibold">
                  Безкоштовна технічна підтримка
                </p>
              </div>
              <div className="flex-col justify-center items-center">
                <img
                  src={`${filepath}checkout.png`}
                  alt="checkout"
                  className="mx-auto"
                />
                <p className="text-xs font-semibold">Безпечна обробка форми</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:order-first flex-col gap-2 sm:w-full lg:w-auto">
          <div className="min-w-[300px] shadow-md mb-2">
            <div className="flex justify-between items-center bg-[#27251F] text-white p-4 text-[10px]">
              <p>Виграна знижка</p>
              <p className="w-[8px] h-[1px] border border-gray-500"></p>
            </div>
            <div className="flex items-center gap-5 p-4 bg-white">
              <img
                src={`${filepath}prize.png`}
                alt="item"
                className="h-[50px]"
              />
              <div className="flex-col text-[10px]">
                <p className="font-semibold">Знижка на 10% на лікування</p>
                {/* <div className="flex gap-1 mb-2">
                  <p className="flex line-through font-semibold">{fullPrice}</p>
                  <p className="text-[#FF0000] font-semibold">{price}</p>
                </div> */}
                <div className="flex gap-2">
                  <div className="border border-black h-[30px] w-[30px] flex justify-center items-center text-lg text-gray-500">
                    <p className="font-semibold">-</p>
                  </div>
                  <div className="border border-black h-[30px] w-[30px] flex justify-center items-center">
                    <p className="font-semibold">1</p>
                  </div>
                  <div className="border border-black h-[30px] w-[30px] flex justify-center items-center text-lg text-gray-500">
                    <p className="font-semibold">+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md text-[10px] p-2 w-[50%] hidden lg:block">
            Ми зв'яжемося з вами протягом 24 годин, щоб підтвердити вашу участь.
          </div>
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
    </form>
  );
}
