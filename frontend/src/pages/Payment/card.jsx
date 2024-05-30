import ServiceSummary from "../../components/payment/serviceSummary";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fpxPic from "../../assets/images/Payment/fpx.png";
import ewalletPic from "../../assets/images/Payment/ewallet.png";
import cardPic from "../../assets/images/Payment/card.png";
import { Button } from "react-bootstrap";

const Card = () => {

  const [cardNumbers, setCardNumbers] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [country, setCountry] = useState("Malaysia");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const location = useLocation();
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    // Fetch card numbers
    fetch("http://localhost:5050/payment/getCardNumbers")
      .then((response) => response.json())
      .then((data) => setCardNumbers(data))
      .catch((error) =>
        console.error("Error fetching card numbers:", error)
      );
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    window.location.href = "/redirect";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedCard = {
      cardNumber,
      expirationDate,
      cvv,
      ownerName,
      country,
    };

    if (cardNumber && expirationDate && cvv && ownerName && country) {
      fetch("http://localhost:5050/payment/submitCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedCard),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Data saved successfully.");
            window.location.href = "/redirect";
          } else {
            throw new Error("Failed to save data.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please enter all the card details.");
    }
  };

  // Format card number input
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D+/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";
    return formatted;
  };

  const handleCardNumberChange = (e) => {
    const formattedCardNumber = formatCardNumber(e.target.value);
    setCardNumber(formattedCardNumber);
  };

  // Format expiration date input
  const formatExpirationDate = (value) => {
    const cleaned = value.replace(/\D+/g, "");
    const truncated = cleaned.substring(0, 4);
    if (truncated.length >= 3) {
      return `${truncated.substring(0, 2)}/${truncated.substring(2, 4)}`;
    } else if (truncated.length >= 1) {
      return truncated;
    }

    return "";
  };

  const handleExpirationDateChange = (e) => {
    const formattedExpirationDate = formatExpirationDate(e.target.value);
    setExpirationDate(formattedExpirationDate);
  };

  return (
    <><Button
      className="BackBtn"
      onClick={() => (window.location.href = "/ReviewProjectPage")}>
      <p>
        <i className="bi-chevron-left" />
        Back
      </p>
    </Button>
    
    <div className="split-container">
        <div className="LeftContainer">
          <p className="PaymentBigtitle">Payment</p>
          <hr className="line" />

          <p className="titleLinked">Linked payment method:</p>

          <div>
            {cardNumbers.map((number, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(number)}
                className={`automatedContainer ${selectedService &&
                    selectedService.cardNumber === number.cardNumber
                    ? "selected"
                    : ""}`}
              >
                <p className="BankName">{number.cardNumber}</p>
              </div>
            ))}
          </div>

          <hr className="line" />
          <p className="titleLinked">Pay With:</p>

          <div className="LeftContainerr">
            <img className="picFpx" src={fpxPic} alt="FPX Logo" />
            <label
              className="choose-payment-method"
              onClick={() => (window.location.href = "/fpx")}
            >
              Online Banking FPX
            </label>
          </div>

          <div className="LeftContainerr">
            <img className="picEwallet" src={ewalletPic} alt="E-Wallet Logo" />
            <label
              className="choose-payment-method"
              onClick={() => (window.location.href = "/ewallet")}
            >
              E- Wallet
            </label>
          </div>

          <div className="LeftContainerr">
            <img
              className="picCard"
              src={cardPic}
              alt="Credit / Debit Card Logo" />
            <label
              onClick={() => (window.location.href = "/card")}
              className="choose-payment-method"
            >
              Credit / Debit Card
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <p className="titleLinked">Card Number</p>
            <input
              className="cardNo-inputCTN"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234  5678  9101  1121"
              maxLength="19"
              required />

            <div className="split-container">
              <div className="c">
                <p className="titleLinked">Expiration Date</p>
                <input
                  className="inputCTN1"
                  type="text"
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required />
              </div>
              <div className="c">
                <p className="titleLinked">CVV</p>
                <input
                  className="inputCTN2"
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength="3"
                  required />
              </div>
            </div>

            <p className="titleLinked">Owner Name</p>
            <input
              className="cardNo-inputCTN"
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="David Teo"
              required />

            <p className="titleLinked">Country</p>
            <input
              className="cardNo-inputCTN"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Malaysia"
              required />

            <button type="submit" className="buttonPay">
              Pay Now
            </button>
          </form>
          <div className="reminder">
            <p>
              Your personal data will be used to process your order, support your
              experience throughout this website, and for other purposes described
              in our privacy policy.
            </p>
          </div>
        </div>

        <ServiceSummary 
        projectTitle={projectTitle} 
        projectBudget={projectBudget} 
        taskData={taskData} 
      />
      </div></>
  );
}

export default Card;
