import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

export default function App() {
  const [data, setData] = useState([]); // State to store the list of items
  const [inputValue, setInputValue] = useState(""); // State to store the input value
  const [selectValue, setSelectValue] = useState("1"); // State to store the selected value from dropdown
  const [errorMessage, setErrorMessage] = useState("No items..."); // State to store the error message
  const [checkedItems, setCheckedItems] = useState([]); // State to store the list of checked items
  const [sortValue, setSortValue] = useState("default"); // State to store the sort option
  const [defaultData, setDefaultData] = useState([]); // State to store the default list of items

  // Function to add a new card
  // This function is called when the "ADD" button is clicked
  const cardAdd = () => {
    if (inputValue.trim().length < 1) {
      // If the input value is empty, show an error message
      setErrorMessage("You must write something to add");
      setTimeout(() => {
        setErrorMessage("No items...");
      }, 3000);
    } else if (inputValue.length > 20) {
      // If the input value exceeds 20 characters, show an error message
      setErrorMessage("Character count should not exceed 20!");
      setTimeout(() => {
        setErrorMessage("No items...");
      }, 4000);
    } else {
      // If input is valid, add the new card to the data and defaultData states
      const newCard = {
        title: inputValue,
        id: v4(),
        isCheacked: false,
        count: selectValue,
      };
      setData((prevData) => [...prevData, newCard]);
      setDefaultData((prevData) => [...prevData, newCard]);
      setInputValue(""); // Clear the input field
    }
  };

  // Function to delete a card by its ID
  // This function is called when the delete button (❌) next to a card is clicked
  const deleteFun = (cardId) => {
    // Filter out the card with the given ID from the data and checkedItems states
    const deletedData = data.filter((item) => {
      return cardId !== item.id;
    });
    const deletedCheckedData = checkedItems.filter((filteredItem) => {
      return cardId !== filteredItem.id;
    });
    setData(deletedData);
    setDefaultData(deletedData);
    setCheckedItems(deletedCheckedData);
  };

  // Function to clear all data
  // This function is called when the "Clear" button is clicked
  const clearData = () => {
    setData([]);
    setCheckedItems([]);
  };

  // Function to handle sorting change
  // This function is called when the sort select dropdown value changes
  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    setSortValue(sortOption);
    if (sortOption === "checked") {
      // If sort option is "checked", sort data so that checked items come first
      setData((prevData) => [
        ...prevData.filter((item) => item.isCheacked),
        ...prevData.filter((item) => !item.isCheacked),
      ]);
    } else if (sortOption === "unchecked") {
      // If sort option is "unchecked", sort data so that unchecked items come first
      setData((prevData) => [
        ...prevData.filter((item) => !item.isCheacked),
        ...prevData.filter((item) => item.isCheacked),
      ]);
    } else {
      // If sort option is "default", reset data to the defaultData state
      setData([...defaultData]);
    }
  };

  return (
    <>
      <section className="TodoSection">
        <div className="sectionContainer">
          <div className="bg">
            <h1 className="section__title">🏝️ Far Away 🧳</h1>
          </div>
          <div className="inp__box">
            <h2 className="inp__box__title">What do you need for your trip?</h2>
            <select
              onChange={(e) => setSelectValue(e.target.value)} // Update selectValue state when dropdown value changes
              className="select"
            >
              {/* Dropdown for selecting count from 1 to 25 */}
              {Array.from({ length: 25 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)} // Update inputValue state when input value changes
              value={inputValue}
              placeholder="item..."
              className="input"
            />
           {/* // Call cardAdd function when "ADD" button is clicked */}
            <button className="addBtn" onClick={cardAdd}>
              ADD
            </button>
          </div>
          <div className="drafts__box">
            <div className="cards__box">
              {data.length < 1 ? (
                <h2 className="noItemTitle">{errorMessage}</h2> // Show error message if data is empty
              ) : (
                data.map((cards) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "5px",
                    }}
                    key={cards.id}
                  >
                    <input
                      style={{
                        accentColor: "orange",
                        width: "30px",
                        height: "30px",
                        border: "none",
                      }}
                      type="checkbox"
                      defaultChecked={cards.isCheacked} // Set checkbox state based on cards.isCheacked
                      onChange={() => {
                        cards.isCheacked = !cards.isCheacked; // Toggle isCheacked state
                        setCheckedItems(data.filter((item) => item.isCheacked)); // Update checkedItems state
                      }}
                    />
                    <h3 className="card__count">{cards.count}</h3>
                    <h1 className="card__title">{cards.title}</h1>
                    <button
                      className="deleteBtn"
                      onClick={() => deleteFun(cards.id)} // Call deleteFun function when delete button is clicked
                    >
                      ❌
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="controlBox">
              <select
                className="sortSelect"
                value={sortValue}
                onChange={handleSortChange} // Call handleSortChange function when sort option changes
              >
                <option value="default">Default</option>
                <option value="checked">Checked</option>
                <option value="unchecked">Unchecked</option>
              </select>
              <button className="clearBtn" onClick={clearData}>
                Clear
                {/* // Call clearData function when "Clear" button is clicked Clear */}
              </button>
            </div>
          </div>
          <div className="aboutBox">
            <h2>
              You have <span>{data.length}</span> items on your list, and you
              already packed {checkedItems.length}
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
