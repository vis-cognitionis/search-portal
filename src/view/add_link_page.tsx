import React, { useEffect, useState } from "react";

import Header from "./header/components/header";
import FilledButton from "core/components/buttons/filled_button";
import { IconArrow, IconClose } from "core/components/icons/icons";
import { InputProps } from "core/interfaces/form_interface";
import { DataProps } from "core/interfaces/data_interface";
import { mainData } from "./search/components/search";
import "../view/search/styles/search_styles.scss";
import "./styles.scss";

const AddLinkPage = () => {
  const [emailError, setEmailError] = useState<string>("");

  const [form, setForm] = useState({
    city: "",
    country: "",
    email: "",
    "name surname": "",
  });

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const [showError, setShowError] = useState<boolean>(false);

  const formDataObj: DataProps = {
    "name surname": form["name surname"],
    company: "Sample Company",
    email: form.email,
    date: new Date().toLocaleDateString(),
    country: form.country,
    city: form.city,
  };

  const emailValidation = (email: string) => {
    let pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email) === false) {
      setEmailError("Enter a valid email address");
      return false;
    } else {
      setEmailError("valid");
    }
  };

  const nameValidation: boolean =
    (form["name surname"].split(/\s/).length! < 2 ||
      form["name surname"].split(/\s/)[1]?.length! < 1 ||
      form["name surname"].length === 1) &&
    form["name surname"] !== "";

  useEffect(() => {
    setShowError(false);
  }, [!nameValidation]);

  useEffect(() => {
    emailValidation(form.email);
  }, [form.email]);

  const navigateResult = () => {
    document.location.href = `${process.env.PUBLIC_URL}/results`;
  };

  const inputArr: InputProps[] = [
    {
      title: "Name Surname",
      name: "name surname",
      placeholder: "Enter name and surname",
      value: form["name surname"],
      minLength: 4,
      maxLength: 60,
    },
    {
      title: "Country",
      name: "country",
      placeholder: "Enter a country",
      value: form.country,
      minLength: 2,
      maxLength: 40,
    },
    {
      title: "City",
      name: "city",
      placeholder: "Enter a city",
      value: form.city,
      minLength: 2,
      maxLength: 40,
    },
    {
      title: "Email",
      name: "email",
      placeholder: "Enter an e-mail (abc@xyz.com)",
      value: form.email,
    },
  ];

  const handleAdd = () => {
    mainData.push(formDataObj);
    localStorage.setItem("mainData", JSON.stringify(mainData));
  };

  return (
    <div style={{ height: window.innerHeight }}>
      <Header status="addLink">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigateResult();
              localStorage.setItem("mainData", JSON.stringify(mainData));
            }}
          >
            <IconArrow />
          </div>
          <p className="returnList">Return to List Page</p>
        </div>
      </Header>

      <form
        className="formContainer"
        onSubmit={(e) => emailError !== "valid" && e.preventDefault()}
      >
        {inputArr.map((item) => {
          const isTwoWords: boolean =
            (form["name surname"].split(/\s/).length! < 2 ||
              form["name surname"].split(/\s/)[1]?.length! < 1) &&
            item.title === "Name Surname" &&
            item.value !== "";

          const isValidEmail: boolean =
            emailError !== "valid" &&
            item.title === "Email" &&
            item.value !== "";

          return (
            <div
              key={item.name}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <p className="inputTitle"> {item.title} </p>

              <input
                name={item.name}
                type="text"
                maxLength={item.maxLength}
                minLength={item.minLength}
                onChange={handleChangeForm}
                value={item.value}
                className="searchBarInput"
                style={{
                  paddingLeft: 16,
                  ...((isTwoWords || isValidEmail) && {
                    outlineColor: "#FF0000",
                    borderColor: "#FF0000",
                    color: "#FF0000",
                  }),
                }}
                placeholder={item.placeholder}
                required
              />
              {isTwoWords && <p className="errorMessage"> At least 2 words </p>}
              {isValidEmail && <p className="errorMessage"> {emailError} </p>}
            </div>
          );
        })}

        <FilledButton
          buttonName="Add"
          onClick={(e) => {
            emailError === "valid" && handleAdd();
            nameValidation ? setShowError(true) : setShowError(false);
          }}
          type="submit"
        />
      </form>

      {showError && (
        <div className="errorBox">
          <div className="textContainer">
            <p className="errorTitle"> Error while adding link element</p>
            <p className="errorContent">
              Name and surname should contain at least 2 words
            </p>
          </div>
          <div className="errorIcon">
            <p className="errorIconText">Error</p>
          </div>
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "14px",
              top: "11px",
            }}
            onClick={() => setShowError(false)}
          >
            <IconClose />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLinkPage;
