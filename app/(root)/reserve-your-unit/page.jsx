"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";

export default function BuyunitForm() {
  const [projectName, setProjectName] = useState("");
  const [projectNameError, setProjectNameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstName2ndPurchaser, setFirstName2ndPurchaser] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastName2ndPurchaser, setLastName2ndPurchaser] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [firstName2ndPurchaserError, setFirstName2ndPurchaserError] =
    useState("");
  const [lastName2ndPurchaserError, setLastName2ndPurchaserError] =
    useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [streetAddressError, setStreetAddressError] = useState("");
  const [addressLine2Error, setAddressLine2Error] = useState("");
  const [cityName, setCityName] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [cityNameError, setCityNameError] = useState("");
  const [provinceNameError, setProvinceNameError] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sin, setSin] = useState("");
  const [jobTitleError, setJobTitleError] = useState("");
  const [employerNameError, setEmployerNameError] = useState("");
  const [sinError, setSinError] = useState("");

  const [streetAddress2ndPurchaser, setStreetAddress2ndPurchaser] =
    useState("");
  const [addressLine22ndPurchaser, setAddressLine22ndPurchaser] = useState("");
  const [streetAddress2ndPurchaserError, setStreetAddress2ndPurchaserError] =
    useState("");
  const [addressLine22ndPurchaserError, setAddressLine22ndPurchaserError] =
    useState("");
  const [cityName2ndPurchaser, setCityName2ndPurchaser] = useState("");
  const [provinceName2ndPurchaser, setProvinceName2ndPurchaser] = useState("");
  const [cityName2ndPurchaserError, setCityName2ndPurchaserError] =
    useState("");
  const [provinceName2ndPurchaserError, setProvinceName2ndPurchaserError] =
    useState("");
  const [postalCode2ndPurchaser, setPostalCode2ndPurchaser] = useState("");
  const [phoneNumber2ndPurchaser, setPhoneNumber2ndPurchaser] = useState("");
  const [postalCode2ndPurchaserError, setPostalCode2ndPurchaserError] =
    useState("");
  const [phoneNumber2ndPurchaserError, setPhoneNumber2ndPurchaserError] =
    useState("");
  const [birthdate2ndPurchaser, setBirthdate2ndPurchaser] = useState("");
  const [email2ndPurchaser, setEmail2ndPurchaser] = useState("");
  const [confirmEmail2ndPurchaser, setConfirmEmail2ndPurchaser] = useState("");
  const [email2ndPurchaserError, setEmail2ndPurchaserError] = useState("");
  const [confirmEmail2ndPurchaserError, setConfirmEmail2ndPurchaserError] =
    useState("");
  const [jobTitle2ndPurchaser, setJobTitle2ndPurchaser] = useState("");
  const [employerName2ndPurchaser, setEmployerName2ndPurchaser] = useState("");
  const [sin2ndPurchaser, setSin2ndPurchaser] = useState("");
  const [jobTitle2ndPurchaserError, setJobTitle2ndPurchaserError] =
    useState("");
  const [employerName2ndPurchaserError, setEmployer2ndPurchaserNameError] =
    useState("");
  const [sin2ndPurchaserError, setSin2ndPurchaserError] = useState("");

  const [floorPlan1, setFloorPlan1] = useState("");
  const [floorType1, setFloorType1] = useState("");
  const [floorPlanError1, setFloorPlanError1] = useState("");
  const [floorTypeError1, setFloorTypeError1] = useState("");
  const [floorPlan2, setFloorPlan2] = useState("");
  const [floorType2, setFloorType2] = useState("");
  const [floorPlanError2, setFloorPlanError2] = useState("");
  const [floorTypeError2, setFloorTypeError2] = useState("");
  const [floorPlan3, setFloorPlan3] = useState("");
  const [floorType3, setFloorType3] = useState("");
  const [floorPlanError3, setFloorPlanError3] = useState("");
  const [floorTypeError3, setFloorTypeError3] = useState("");
  const [secondPurchaser, setSecondPurchaser] = useState("No");
  const [buyerType, setBuyerType] = useState("Investor");

  const [wantParking, setWantParking] = useState("Yes");
  const [wantLocker, setWantLocker] = useState("Yes");
  const [isCanadianCitizenStr, setIsCanadianCitizen] = useState("No");
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [salesPersonError, setSalesPersonError] = useState("");
  const handleNoteChange = (event) => {
    const value = event.target.value;
    if (value.length <= 400) {
      setNote(value);
      setNoteError("");
    } else {
      setNoteError("Note cannot exceed 150 characters");
    }
  };
  const handleWantLockerChange = (event) => {
    const value = event.target.value;
    setWantLocker(value);
  };
  const handleIsCAnChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setIsCanadianCitizen(value);
  };
  const handleWantParkingChange = (event) => {
    const value = event.target.value;
    setWantParking(value);
  };
  const handleSecondPurchaserChange = (event) => {
    const value = event.target.value;
    setSecondPurchaser(value);
  };

  const handleBuyerTypeChange = (event) => {
    const value = event.target.value;
    setBuyerType(value);
  };

  const handlePreventNumbers = (e) => {
    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault();
    }

    const isAlphanumericOrSpace = /^[a-zA-Z0-9\s]*$/;
    if (!isAlphanumericOrSpace.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleProjectNameChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setProjectName(value);
  };

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z]+$/.test(value) || value === "") {
      setFirstName(value);
      setFirstNameError("");
    } else {
      setFirstNameError("Please enter only alphabets");
    }
  };
  const handleFirstName2Change = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z]+$/.test(value) || value === "") {
      setFirstName2ndPurchaser(value);
      setFirstName2ndPurchaserError("");
    } else {
      setFirstName2ndPurchaserError("Please enter only alphabets");
    }
  };
  const handleSalesPersonChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z]+$/.test(value) || value === "") {
      setSelectedSalesperson(value);
      setSalesPersonError("");
    } else {
      setSalesPersonError("Please enter only alphabets");
    }
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z]+$/.test(value) || value === "") {
      setLastName(value);
      setLastNameError("");
    } else {
      setLastNameError("Please enter only alphabets");
    }
  };
  const handleLastName2Change = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z]+$/.test(value) || value === "") {
      setLastName2ndPurchaser(value);
      setLastName2ndPurchaserError("");
    } else {
      setLastName2ndPurchaserError("Please enter only alphabets");
    }
  };
  const handleCityNameChange = (event) => {
    const value = event.target.value;

    // Check if the value contains only alphabets and spaces
    if (/^[a-zA-Z\s]+$/.test(value) || value === "") {
      setCityName(value);
      setCityNameError("");
    } else {
      setCityNameError("Please enter only alphabets");
    }
  };
  const handleCityName2Change = (event) => {
    const value = event.target.value;

    // Check if the value contains only alphabets and spaces
    if (/^[a-zA-Z\s]+$/.test(value) || value === "") {
      setCityName2ndPurchaser(value);
      setCityName2ndPurchaserError("");
    } else {
      setCityName2ndPurchaserError("Please enter only alphabets");
    }
  };

  const handleProvinceNameChange = (event) => {
    const value = event.target.value;

    // Check if the value contains only alphabets and spaces
    if (/^[a-zA-Z\s]+$/.test(value) || value === "") {
      setProvinceName(value);
      setProvinceNameError("");
    } else {
      setProvinceNameError("Please enter only alphabets");
    }
  };
  const handleProvinceName2Change = (event) => {
    const value = event.target.value;

    // Check if the value contains only alphabets and spaces
    if (/^[a-zA-Z\s]+$/.test(value) || value === "") {
      setProvinceName2ndPurchaser(value);
      setProvinceName2ndPurchaserError("");
    } else {
      setProvinceName2ndPurchaserError("Please enter only alphabets");
    }
  };
  const handleStreetAddrChange = (event) => {
    const value = event.target.value;

    // Check if the value contains only alphabets and numbers
    if (/^[a-zA-Z0-9\s]+$/.test(value) || value === "") {
      setStreetAddress(value);
      setStreetAddressError("");
    } else {
      setStreetAddressError("Please enter only alphabets and numbers");
    }
  };
  const handleStreet2AddrChange = (event) => {
    const value = event.target.value;

    // Check if the value contains only alphabets and numbers
    if (/^[a-zA-Z0-9\s]+$/.test(value) || value === "") {
      setStreetAddress2ndPurchaser(value);
      setStreetAddress2ndPurchaserError("");
    } else {
      setStreetAddress2ndPurchaserError(
        "Please enter only alphabets and numbers"
      );
    }
  };

  const handleAddrNameChange = (event) => {
    const value = event.target.value;

    // Check if the value contains only alphabets and numbers
    if (/^[a-zA-Z0-9\s]+$/.test(value) || value === "") {
      setAddressLine2(value);
      setAddressLine2Error("");
    } else {
      setAddressLine2Error("Please enter only alphabets and numbers");
    }
  };
  const handleAddrName2Change = (event) => {
    const value = event.target.value;

    // Check if the value contains only alphabets and numbers
    if (/^[a-zA-Z0-9\s]+$/.test(value) || value === "") {
      setAddressLine22ndPurchaser(value);
      setAddressLine22ndPurchaserError("");
    } else {
      setAddressLine22ndPurchaserError(
        "Please enter only alphabets and numbers"
      );
    }
  };

  const handlePostalCodeChange = (event) => {
    const value = event.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setPostalCode(value);
      setPostalCodeError(
        value.length === 6 ? "" : "Please enter a valid 6-digit postal code"
      );
    } else {
      setPostalCodeError("Please enter a valid 6-digit postal code");
    }
  };
  const handlePostalCode2Change = (event) => {
    const value = event.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setPostalCode2ndPurchaser(value);
      setPostalCode2ndPurchaserError(
        value.length === 6 ? "" : "Please enter a valid 6-digit postal code"
      );
    } else {
      setPostalCode2ndPurchaserError(
        "Please enter a valid 6-digit postal code"
      );
    }
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;

    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
      setPhoneNumberError(
        value.length === 10 ? "" : "Please enter a valid 10-digit phone number"
      );
    } else {
      setPhoneNumberError("Please enter a valid 10-digit phone number");
    }
  };
  const handlePhoneNumber2Change = (event) => {
    const value = event.target.value;

    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber2ndPurchaser(value);
      setPhoneNumber2ndPurchaserError(
        value.length === 10 ? "" : "Please enter a valid 10-digit phone number"
      );
    } else {
      setPhoneNumber2ndPurchaserError(
        "Please enter a valid 10-digit phone number"
      );
    }
  };
  const handleBirthdateChange = (event) => {
    const value = event.target.value;

    // The value from the date input will be in the format YYYY-MM-DD
    setBirthdate(value);
    // Additional validation or cleanup logic if needed
  };
  const handleBirthdate2Change = (event) => {
    const value = event.target.value;

    // The value from the date input will be in the format YYYY-MM-DD
    setBirthdate2ndPurchaser(value);
    // Additional validation or cleanup logic if needed
  };

  const validateEmail = (value) => {
    // Check if the value is a valid email format
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value);
  };
  const handleEmailChange = (event) => {
    const value = event.target.value;

    setEmail(value);

    if (!validateEmail(value) && value !== "") {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };
  const handleEmail2Change = (event) => {
    const value = event.target.value;

    setEmail2ndPurchaser(value);

    if (!validateEmail(value) && value !== "") {
      setEmail2ndPurchaserError("Please enter a valid email");
    } else {
      setEmail2ndPurchaserError("");
    }
  };

  const handleConfirmEmailChange = (event) => {
    const value = event.target.value;

    setConfirmEmail(value);

    if (!validateEmail(value) && value !== "") {
      setConfirmEmailError("Please enter a valid email");
    } else {
      setConfirmEmailError("");
    }
  };
  const handleConfirmEmail2Change = (event) => {
    const value = event.target.value;

    setConfirmEmail2ndPurchaser(value);

    if (!validateEmail(value) && value !== "") {
      setConfirmEmail2ndPurchaserError("Please enter a valid email");
    } else {
      setConfirmEmail2ndPurchaserError("");
    }
  };
  const handleEmailBlur = () => {
    // If confirm email is filled, check for match
    if (confirmEmail !== "" && email !== confirmEmail) {
      setConfirmEmailError("Emails do not match");
    } else {
      setConfirmEmailError("");
    }
  };

  const handleConfirmEmailBlur = () => {
    // Check if the confirm email matches the email
    if (confirmEmail !== email) {
      setConfirmEmailError("Emails do not match");
    } else {
      setConfirmEmailError("");
    }
  };
  const handleConfirmEmail2Blur = () => {
    // Check if the confirm email matches the email
    if (confirmEmail2ndPurchaser !== email2ndPurchaser) {
      setConfirmEmail2ndPurchaserError("Emails do not match");
    } else {
      setConfirmEmail2ndPurchaserError("");
    }
  };
  const validateAlphabets = (value) => {
    // Check if the value contains only alphabets
    return /^[a-zA-Z]+$/.test(value);
  };

  const handleJobTitleChange = (event) => {
    const value = event.target.value;

    setJobTitle(value);

    if (!validateAlphabets(value) && value !== "") {
      setJobTitleError("Only alphabets are allowed");
    } else {
      setJobTitleError("");
    }
  };

  const handleJobTitle2Change = (event) => {
    const value = event.target.value;

    setJobTitle2ndPurchaser(value);

    if (!validateAlphabets(value) && value !== "") {
      setJobTitle2ndPurchaserError("Only alphabets are allowed");
    } else {
      setJobTitle2ndPurchaserError("");
    }
  };

  const handleEmployerNameChange = (event) => {
    const value = event.target.value;

    setEmployerName(value);

    if (!validateAlphabets(value) && value !== "") {
      setEmployerNameError("Only alphabets are allowed");
    } else {
      setEmployerNameError("");
    }
  };
  const handleEmployerName2Change = (event) => {
    const value = event.target.value;

    setEmployerName2ndPurchaser(value);

    if (!validateAlphabets(value) && value !== "") {
      setEmployer2ndPurchaserNameError("Only alphabets are allowed");
    } else {
      setEmployer2ndPurchaserNameError("");
    }
  };

  const handleSinChange = (event) => {
    const value = event.target.value;

    setSin(value);

    if (!/^[a-zA-Z0-9]+$/.test(value) && value !== "") {
      setSinError("Only alphabets and numbers are allowed");
    } else {
      setSinError("");
    }
  };
  const handleSin2Change = (event) => {
    const value = event.target.value;

    setSin2ndPurchaser(value);

    if (!/^[a-zA-Z0-9]+$/.test(value) && value !== "") {
      setSin2ndPurchaserError("Only alphabets and numbers are allowed");
    } else {
      setSin2ndPurchaserError("");
    }
  };

  const handlePostalCodeBlur = () => {
    if (postalCode.length === 6) {
      setPostalCodeError("");
    }
  };
  const handlePostalCode2Blur = () => {
    if (postalCode2ndPurchaser.length === 6) {
      setPostalCode2ndPurchaserError("");
    }
  };

  const handlePhoneNumberBlur = () => {
    if (phoneNumber.length === 10) {
      setPhoneNumberError("");
    }
  };
  const handlePhoneNumber2Blur = () => {
    if (phoneNumber2ndPurchaser.length === 10) {
      setPhoneNumber2ndPurchaserError("");
    }
  };
  const handleFloorPlanChange1 = (event) => {
    const value = event.target.value;

    setFloorPlan1(value);

    if (!validateAlphabets(value) && value !== "") {
      setFloorPlanError1("Only alphabets are allowed");
    } else {
      setFloorPlanError1("");
    }
  };

  const handleFloorTypeChange1 = (event) => {
    const value = event.target.value;

    setFloorType1(value);

    if (!validateAlphabets(value) && value !== "") {
      setFloorTypeError1("Only alphabets are allowed");
    } else {
      setFloorTypeError1("");
    }
  };
  const handleFloorPlanChange2 = (event) => {
    const value = event.target.value;

    setFloorPlan2(value);

    if (!validateAlphabets(value) && value !== "") {
      setFloorPlanError2("Only alphabets are allowed");
    } else {
      setFloorPlanError2("");
    }
  };

  const handleFloorTypeChange2 = (event) => {
    const value = event.target.value;

    setFloorType2(value);

    if (!validateAlphabets(value) && value !== "") {
      setFloorTypeError2("Only alphabets are allowed");
    } else {
      setFloorTypeError2("");
    }
  };
  const handleFloorPlanChange3 = (event) => {
    const value = event.target.value;

    setFloorPlan3(value);

    if (!validateAlphabets(value) && value !== "") {
      setFloorPlanError3("Only alphabets are allowed");
    } else {
      setFloorPlanError3("");
    }
  };

  const handleFloorTypeChange3 = (event) => {
    const value = event.target.value;

    setFloorType3(value);

    if (!validateAlphabets(value) && value !== "") {
      setFloorTypeError3("Only alphabets are allowed");
    } else {
      setFloorTypeError3("");
    }
  };
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [salespersons, setSalespersons] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState("");

  const getPresignedUrl = async (fileType) => {
    try {
      // Placeholder for your get-pre-signed-url API endpoint
      const getPresignedUrlEndpoint = "/api/v1/aws";

      const response = await axios.post(getPresignedUrlEndpoint, {
        fileType: fileType,
      });

      // console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error getting pre-signed URL:", error);
      throw new Error("Error getting pre-signed URL");
    }
  };
  const validateFile = (file) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 6 * 1024 * 1024; // 6 MB in bytes

    // Check file type
    if (!allowedFileTypes.includes(file.type)) {
      return `Invalid file type. Accepted types: ${allowedFileTypes.join(
        ", "
      )}.`;
    }

    // Check file size
    if (file.size > maxSize) {
      return `File size exceeds the maximum limit of 6 MB.`;
    }

    return null; // File is valid
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    let isValid = true;
    const errorMessages = [];

    Array.from(files).forEach(async (file) => {
      const validationResult = validateFile(file);
      if (validationResult) {
        isValid = false;
        errorMessages.push(`Error in file ${file.name}: ${validationResult}`);
      } else {
        // Upload the file immediately after it is selected
        await uploadFile(file);
      }
    });

    if (isValid) {
      setSelectedFiles([...selectedFiles, ...Array.from(files)]);
      setUploadError("");
    } else {
      // Display error messages for invalid files
      setUploadError(errorMessages.join(" "));
    }
  };

  const uploadFile = async (file) => {
    try {
      const presignedUrlData = await getPresignedUrl(file.name);

      // Extract the upload URL from the response
      const { uploadUrl, key } = presignedUrlData;

      // Use FormData to append the file to be uploaded
      console.log(file);
      // const formData = new FormData();
      // formData.append("file", file);

      const arrayBuffer = await file.arrayBuffer();

      // Convert ArrayBuffer to Uint8Array
      const uint8Array = new Uint8Array(arrayBuffer);
      // Perform the actual file upload to AWS using the pre-signed URL
      await axios.put(uploadUrl, uint8Array, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // console.log(uploadUrl, key);
      // Update the list of uploaded files
      setUploadedFiles([
        ...uploadedFiles,
        { key: key, name: file.name, url: uploadUrl.split("?")[0] },
      ]);

      // console.log(uploadedFiles);
      return true;
    } catch (error) {
      console.error("File upload error:", error);
      setUploadError("Error uploading files. Please try again.");
      return false;
    }
  };

  const handleFileUpload = async () => {
    try {
      // Placeholder for your AWS pre-signed URL endpoint
      const presignedUrlEndpoint = "YOUR_AWS_PRESIGNED_URL_ENDPOINT";

      // Iterate over selected files and upload them to AWS
      for (const file of selectedFiles) {
        await uploadFile(file);
      }

      // Clear selected files after successful upload
      setSelectedFiles([]);
      setUploadError("");
    } catch (error) {
      console.error("File upload error:", error);
      setUploadError("Error uploading files. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch salespersons from the API
    const fetchSalespersons = async () => {
      try {
        const response = await axios.get("/api/v1/admins");
        const salespersonsData = response.data.data;
        const salespersonNames = salespersonsData.map(
          (salesperson) => salesperson.name
        );
        setSalespersons(salespersonNames);
      } catch (error) {
        console.error("Error fetching salespersons:", error);
      }
    };

    fetchSalespersons();
  }, []);

  // console.log(selectedFiles);
  // console.log(uploadFile);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(uploadedFiles);
    if (email !== confirmEmail) {
      // Display an error message or handle the mismatched emails as needed
      toast.error("Email and confirm email must match.");
      return;
    }
    if (uploadedFiles.length < 2) {
      toast.error("Minimum 2 files required.");
      return;
    }
    let payload = {
      projectName,
      firstName,
      lastName,
      streetAddress,
      addressLine2,
      cityName,
      provinceName,
      postalCode,
      phoneNumber,
      birthdate,
      email,
      confirmEmail,
      jobTitle,
      employerName,
      sin,
      floorPlan1,
      floorType1,
      floorPlan2,
      floorType2,
      floorPlan3,
      floorType3,
      secondPurchaser,
      buyerType,
      wantParking,
      wantLocker,
      note,
      uploadedFiles,
      selectedSalesperson,
      isCanadianCitizenStr,
      firstName2ndPurchaser,
      lastName2ndPurchaser,
      streetAddress2ndPurchaser,
      addressLine22ndPurchaser,
      cityName2ndPurchaser,
      provinceName2ndPurchaser,
      phoneNumber2ndPurchaser,
      postalCode2ndPurchaser,
      birthdate2ndPurchaser,
      email2ndPurchaser,
      jobTitle2ndPurchaser,
      employerName2ndPurchaser,
      sin2ndPurchaser,
    };
    try {
      payload.addressLine1 = payload.addressLine2;
      payload.city = payload.cityName;
      payload.dob = payload.birthdate;
      payload.suiteChoice1 = {
        floorPlan: payload.floorPlan1,
        floorName: payload.floorType1,
      };
      payload.suiteChoice2 = {
        floorPlan: payload.floorPlan2,
        floorName: payload.floorType2,
      };
      payload.suiteChoice3 = {
        floorPlan: payload.floorPlan3,
        floorName: payload.floorType3,
      };
      payload.is2ndPurchaser = payload.secondPurchaser === "No" ? false : true;
      if (payload.secondPurchaser === "Yes") {
        payload.firstNameOf2ndPurchaser = payload.firstName2ndPurchaser;
        payload.lastNameOf2ndPurchaser = payload.lastName2ndPurchaser;
        payload.streetAddressOf2ndPurchaser = payload.streetAddress2ndPurchaser;
        payload.addressLine1Of2ndPurchaser = payload.addressLine22ndPurchaser;
        payload.cityOf2ndPurchaser = payload.cityName2ndPurchaser;
        payload.provinceNameOf2ndPurchaser = payload.provinceName2ndPurchaser;
        payload.postalCodeOf2ndPurchaser = +payload.postalCode2ndPurchaser;
        payload.phoneNumberOf2ndPurchaser = +payload.phoneNumber2ndPurchaser;
        payload.dobOf2ndPurchaser = payload.birthdate2ndPurchaser;
        payload.emailOf2ndPurchaser = payload.email2ndPurchaser;
        payload.jobTitleOf2ndPurchaser = payload.jobTitleOf2ndPurchaser;
        payload.sinOf2ndPurchaser = payload.sin2ndPurchaser;
        payload.employerNameOf2ndPurchaser = payload.employerName2ndPurchaser;
      }
      payload.investorOrEndUser = payload.buyerType;
      payload.hasOptedForParking = payload.wantParking;
      payload.hasOptedForLocker = payload.wantLocker;
      payload.isCanadianCitizen =
        payload.isCanadianCitizenStr === "Yes" ? true : false;

      payload.notes = payload.note;
      payload.phoneNumber = +payload.phoneNumber;
      console.log(uploadedFiles);
      payload.dlOrPassport = {
        filename: payload.uploadedFiles?.[0].name,
        link: payload.uploadedFiles?.[0].url,
      };
      const dataArray = uploadedFiles.map((file) => ({
        filename: file.name,
        link: file.url,
      }));
      payload.dlOrPassport = dataArray;
      payload.salesPerson = payload.selectedSalesperson;
      console.log(payload);
      payload = Object.fromEntries(
        Object.entries(payload).filter(
          ([key, value]) => value !== undefined && value !== 0
        )
      );
      // await axios.post(`/api/v1/aws/send-email`, payload);
      const res = await axios.post("/api/v1/worksheets", payload);
      console.log(res);
      toast.success(
        "Thanks for submitting the request to buy a unit, we will be in touch with you soon!"
      );

      // // Optionally, you can handle success or show a message to the user
      setProjectName("");
      setFirstName("");
      setFirstName2ndPurchaser("");
      setLastName2ndPurchaser("");
      setStreetAddress2ndPurchaser("");
      setAddressLine22ndPurchaser("");
      setCityName2ndPurchaser("");
      setProvinceName2ndPurchaser("");
      setPostalCode2ndPurchaser("");
      setPhoneNumber2ndPurchaser("");
      setBirthdate2ndPurchaser("");
      setEmail2ndPurchaser("");
      setConfirmEmail2ndPurchaser("");
      setJobTitle2ndPurchaser("");
      setEmployerName2ndPurchaser("");
      setSin2ndPurchaser("");

      setLastName("");
      setStreetAddress("");
      setAddressLine2("");
      setCityName("");
      setProvinceName("");
      setPostalCode("");
      setPhoneNumber("");
      setBirthdate("");
      setEmail("");
      setConfirmEmail("");
      setJobTitle("");
      setEmployerName("");
      setSin("");
      setFloorPlan1("");
      setFloorType1("");
      setFloorPlan2("");
      setFloorType2("");
      setFloorPlan3("");
      setFloorType3("");
      setSecondPurchaser("No");
      setBuyerType("Investor");
      setWantParking("Yes");
      setWantLocker("Yes");
      setNote("");
      setUploadedFiles([]);
      setSelectedFiles([]);
      setSelectedSalesperson("");
      setIsCanadianCitizen("No");
    } catch (error) {
      // Handle error or show an error message to the user
      console.error("Error sending email:", error);
    }
  };
  return (
    <div className="">
      <section className=" flex justify-center items-center py-10">
        <form
          onSubmit={handleSubmit}
          className="mb-14 md:mb-20 lg:mb-28 w-[97%] rounded-3xl bg-white  text-[#EFEFEF] flex flex-col px-8 py-8 text-sm md:text-base border border-gray-500"
        >
          <h3 className=" font-Lato text-black  text-2xl font-normal md:font-medium md:text-4xl">
            Buy Your Unit
          </h3>
          {/* name -container */}

          <div className="form-name flex flex-col mt-8 mb-8 ">
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-6">
              <div className="flex flex-col w-full md:w-[49%]">
                <label
                  htmlFor="projectName"
                  className="buy-unit-labels text-secondary "
                >
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  name="projectName"
                  placeholder="Enter your project name"
                  value={projectName}
                  onChange={handleProjectNameChange}
                  onKeyDown={handlePreventNumbers}
                  className="placeholder:text-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] focus:border-[#BBBBBB] text-black"
                />
                {projectNameError && (
                  <p className="text-red-500 text-xs mt-1">
                    {projectNameError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="form-name flex flex-col mb-8">
            <h4 className="buy-unit-headings">Name</h4>
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-6">
              <div className="flex flex-col w-full">
                <label htmlFor="Fname" className="buy-unit-labels">
                  First Name
                </label>
                <input
                  type="text"
                  name="Fname"
                  placeholder="Enter your First name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                />
                {firstNameError && (
                  <p className="text-red-500 text-xs mt-1">{firstNameError}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="Lname" className="buy-unit-labels">
                  Last Name
                </label>
                <input
                  type="text"
                  name="Lname"
                  placeholder="Enter your Last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                />
                {lastNameError && (
                  <p className="text-red-500 text-xs mt-1">{lastNameError}</p>
                )}
              </div>
            </div>
          </div>

          {/* address -container */}
          <div className="form-name flex flex-col">
            <h4 className="buy-unit-headings mb-4">Address</h4>
            {/* addr */}
            <div className="flex flex-col justify-between items-center gap-3 mb-3">
              <div className="flex flex-col w-full">
                <label htmlFor="StreetAddr " className="buy-unit-labels">
                  Street Address
                </label>
                <input
                  type="text"
                  name="StreetAddr"
                  placeholder="Enter your address"
                  value={streetAddress}
                  onChange={handleStreetAddrChange}
                  className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                />
                {streetAddressError && (
                  <p className="text-red-500 text-xs mt-1">
                    {streetAddressError}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="AddrLine2" className="buy-unit-labels">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="AddrLine2"
                  placeholder="Enter your address"
                  value={addressLine2}
                  onChange={handleAddrNameChange}
                  className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                />
                {addressLine2Error && (
                  <p className="text-red-500 text-xs mt-1">
                    {addressLine2Error}
                  </p>
                )}
              </div>
            </div>
            {/* city and prvience */}
            <div className="flex flex-col lg:flex-row items-center gap-3 mb-3">
              <div className="flex flex-col w-full">
                <label htmlFor="CityName" className="buy-unit-labels">
                  City Name
                </label>
                <input
                  type="text"
                  name="CityName"
                  placeholder="Enter your city"
                  value={cityName}
                  onChange={handleCityNameChange}
                  className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                />

                {cityNameError && (
                  <p className="text-red-500 text-xs mt-1">{cityNameError}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="ProvinceName" className="buy-unit-labels">
                  Province Name
                </label>
                <input
                  type="text"
                  name="ProvinceName"
                  placeholder="Enter your province"
                  value={provinceName}
                  onChange={handleProvinceNameChange}
                  className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                />
                {provinceNameError && (
                  <p className="text-red-500 text-xs mt-1">
                    {provinceNameError}
                  </p>
                )}
              </div>
            </div>
            {/* postal and phone number */}
            <div>
              <div className="flex flex-col w-full lg:w-1/2 gap-3">
                <div className="flex flex-col">
                  <label htmlFor="PostalCode" className="buy-unit-labels">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="PostalCode"
                    placeholder="Enter your postal code"
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    onBlur={handlePostalCodeBlur}
                    className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                  />
                  {postalCodeError && (
                    <p className="text-red-500 text-xs mt-1">
                      {postalCodeError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="PhoneNumber" className="buy-unit-labels">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="PhoneNumber"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onBlur={handlePhoneNumberBlur}
                    className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                  />
                  {phoneNumberError && (
                    <p className="text-red-500 text-xs mt-1">
                      {phoneNumberError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                  <label htmlFor="Birthdate" className="buy-unit-labels">
                    Birthdate
                  </label>
                  <input
                    type="date"
                    name="Birthdate"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    className="text-sm md:text-base  font-Lato  focus:border-[#BBBBBB] px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* email */}
          <div className="mt-6">
            <div className="form-name flex flex-col">
              <h4 className="buy-unit-headings mb-3">Email</h4>
              <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
                <div className="flex flex-col w-full">
                  <label htmlFor="Email" className="buy-unit-labels">
                    Email
                  </label>
                  <input
                    type="text"
                    name="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    className="placeholder:text-[#BBBBBB] text-sm md:text-base focus:border-[#BBBBBB]  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="ConfirmEmail" className="buy-unit-labels">
                    Confirm Email
                  </label>
                  <input
                    type="text"
                    name="ConfirmEmail"
                    placeholder="Confirm your email"
                    value={confirmEmail}
                    onChange={handleConfirmEmailChange}
                    onBlur={handleConfirmEmailBlur}
                    className="placeholder:text-[#BBBBBB] text-sm md:text-base focus:border-[#BBBBBB]  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                  />
                  {confirmEmailError && (
                    <p className="text-red-500 text-xs mt-1">
                      {confirmEmailError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* occuption */}
          <div className="form-name flex flex-col mt-6">
            <h4 className="buy-unit-headings mb-4">Occupation</h4>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-3 mb-3">
              <div className="flex flex-col w-full">
                <label htmlFor="JobTitle" className="buy-unit-labels">
                  Job Title
                </label>
                <input
                  type="text"
                  name="JobTitle"
                  placeholder="Enter your job title"
                  value={jobTitle}
                  onChange={handleJobTitleChange}
                  className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                />
                {jobTitleError && (
                  <p className="text-red-500 text-xs mt-1">{jobTitleError}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="EmployerName" className="buy-unit-labels">
                  Employer Name
                </label>
                <input
                  type="text"
                  name="EmployerName"
                  placeholder="Enter your employer name"
                  value={employerName}
                  onChange={handleEmployerNameChange}
                  className="placeholder:text-[#BBBBBB] text-sm  focus:border-[#BBBBBB] md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                />
                {employerNameError && (
                  <p className="text-red-500 text-xs mt-1">
                    {employerNameError}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Sin" className="buy-unit-labels">
                SIN
              </label>
              <input
                type="text"
                name="Sin"
                placeholder="Enter your SIN"
                value={sin}
                onChange={handleSinChange}
                className="placeholder:text-[#BBBBBB]  focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
              />
              {sinError && (
                <p className="text-red-500 text-xs mt-1">{sinError}</p>
              )}
            </div>
          </div>

          {/* choice 1 */}
          <h4 className="buy-unit-headings mt-8">Suite Choice 1</h4>
          <div className="flex flex-col lg:flex-row justify-between items-center mt-3 gap-3">
            <div className="flex flex-col w-full">
              <label htmlFor="FloorPlan1" className="buy-unit-labels">
                Floor Plan
              </label>
              <input
                type="text"
                name="FloorPlan1"
                placeholder="Enter floor plan"
                value={floorPlan1}
                onChange={handleFloorPlanChange1}
                className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
              />
              {floorPlanError1 && (
                <p className="text-red-500 text-xs mt-1">{floorPlanError1}</p>
              )}
            </div>
            <div className="flex flex-col  w-full">
              <label htmlFor="FloorType1" className="buy-unit-labels">
                Low/Mid/High Floor
              </label>
              <input
                type="text"
                name="FloorType1"
                placeholder="Enter floor type"
                value={floorType1}
                onChange={handleFloorTypeChange1}
                className="placeholder:text-[#BBBBBB]  focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
              />
              {floorPlanError1 && (
                <p className="text-red-500 text-xs mt-1">{floorTypeError1}</p>
              )}
            </div>
          </div>

          {/* choice 2 */}
          <h4 className="buy-unit-headings mt-8">Suite Choice 2</h4>
          <div className="flex flex-col lg:flex-row justify-between items-center mt-3 gap-3">
            <div className="flex flex-col w-full">
              <label htmlFor="FloorPlan2" className="buy-unit-labels">
                Floor Plan
              </label>
              <input
                type="text"
                name="FloorPlan2"
                placeholder="Enter floor plan"
                value={floorPlan2}
                onChange={handleFloorPlanChange2}
                className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB]  text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
              />
              {floorPlanError2 && (
                <p className="text-red-500 text-xs mt-1">{floorPlanError2}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="FloorType2" className="buy-unit-labels">
                Low/Mid/High Floor
              </label>
              <input
                type="text"
                name="FloorType2"
                placeholder="Enter floor type"
                value={floorType2}
                onChange={handleFloorTypeChange2}
                className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
              />
              {floorTypeError2 && (
                <p className="text-red-500 text-xs mt-1">{floorTypeError2}</p>
              )}
            </div>
          </div>

          {/* choice 3 */}
          <h4 className="buy-unit-headings mt-8">Suite Choice 3</h4>
          <div className="flex flex-col lg:flex-row justify-between items-center mt-3 gap-3">
            <div className="flex flex-col w-full">
              <label htmlFor="FloorPlan3" className="buy-unit-labels">
                Floor Plan
              </label>
              <input
                type="text"
                name="FloorPlan3"
                placeholder="Enter floor plan"
                value={floorPlan3}
                onChange={handleFloorPlanChange3}
                className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
              />
              {floorPlanError3 && (
                <p className="text-red-500 text-xs mt-1">{floorPlanError3}</p>
              )}
            </div>
            <div className="flex flex-col  w-full">
              <label htmlFor="FloorType3" className="buy-unit-labels">
                Low/Mid/High Floor
              </label>
              <input
                type="text"
                name="FloorType3"
                placeholder="Enter floor type"
                value={floorType3}
                onChange={handleFloorTypeChange3}
                className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
              />
              {floorTypeError3 && (
                <p className="text-red-500 text-xs mt-1">{floorTypeError3}</p>
              )}
            </div>
          </div>

          {/* 2 Purchaser */}
          <div className="mt-4 lg:mt-7 mb-3">
            <div className="form-name flex flex-col">
              <h4 className="buy-unit-labels">2nd Purchaser?</h4>
              <div className="flex items-center gap-7">
                <div>
                  <input
                    type="radio"
                    id="Yes"
                    name="secondPurchaser"
                    value="Yes"
                    checked={secondPurchaser === "Yes"}
                    onChange={handleSecondPurchaserChange}
                    className="text-[#BBBBBB]"
                  />
                  <label htmlFor="Yes" className="ml-3 text-black">
                    Yes
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="No"
                    name="secondPurchaser"
                    value="No"
                    checked={secondPurchaser === "No"}
                    onChange={handleSecondPurchaserChange}
                    className="text-[#BBBBBB]"
                  />
                  <label htmlFor="No" className="ml-3 text-black">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          {secondPurchaser === "Yes" && (
            <>
              <div className="form-name flex flex-col mb-8">
                <h4 className="buy-unit-headings">Name</h4>
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-6">
                  <div className="flex flex-col w-full">
                    <label htmlFor="Fname" className="buy-unit-labels">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="Fname"
                      placeholder="Enter your First name"
                      value={firstName2ndPurchaser}
                      onChange={handleFirstName2Change}
                      className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                    />
                    {firstName2ndPurchaserError && (
                      <p className="text-red-500 text-xs mt-1">
                        {firstName2ndPurchaserError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="Lname" className="buy-unit-labels">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="Lname"
                      placeholder="Enter your Last name"
                      value={lastName2ndPurchaser}
                      onChange={handleLastName2Change}
                      className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                    />
                    {lastName2ndPurchaserError && (
                      <p className="text-red-500 text-xs mt-1">
                        {lastName2ndPurchaserError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* address -container */}
              <div className="form-name flex flex-col">
                <h4 className="buy-unit-headings mb-4">Address</h4>
                {/* addr */}
                <div className="flex flex-col justify-between items-center gap-3 mb-3">
                  <div className="flex flex-col w-full">
                    <label htmlFor="StreetAddr " className="buy-unit-labels">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="StreetAddr"
                      placeholder="Enter your address"
                      value={streetAddress2ndPurchaser}
                      onChange={handleStreet2AddrChange}
                      className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                    />
                    {streetAddress2ndPurchaserError && (
                      <p className="text-red-500 text-xs mt-1">
                        {streetAddress2ndPurchaserError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="AddrLine2" className="buy-unit-labels">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="AddrLine2"
                      placeholder="Enter your address"
                      value={addressLine22ndPurchaser}
                      onChange={handleAddrName2Change}
                      className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                    />
                    {addressLine22ndPurchaserError && (
                      <p className="text-red-500 text-xs mt-1">
                        {addressLine22ndPurchaserError}
                      </p>
                    )}
                  </div>
                </div>
                {/* city and prvience */}
                <div className="flex flex-col lg:flex-row items-center gap-3 mb-3">
                  <div className="flex flex-col w-full">
                    <label htmlFor="CityName" className="buy-unit-labels">
                      City Name
                    </label>
                    <input
                      type="text"
                      name="CityName"
                      placeholder="Enter your city"
                      value={cityName2ndPurchaser}
                      onChange={handleCityName2Change}
                      className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                    />

                    {cityName2ndPurchaserError && (
                      <p className="text-red-500 text-xs mt-1">
                        {cityName2ndPurchaserError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="ProvinceName" className="buy-unit-labels">
                      Province Name
                    </label>
                    <input
                      type="text"
                      name="ProvinceName"
                      placeholder="Enter your province"
                      value={provinceName2ndPurchaser}
                      onChange={handleProvinceName2Change}
                      className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                    />
                    {provinceName2ndPurchaserError && (
                      <p className="text-red-500 text-xs mt-1">
                        {provinceName2ndPurchaserError}
                      </p>
                    )}
                  </div>
                </div>
                {/* postal and phone number */}
                <div>
                  <div className="flex flex-col w-full lg:w-1/2 gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="PostalCode" className="buy-unit-labels">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="PostalCode"
                        placeholder="Enter your postal code"
                        value={postalCode2ndPurchaser}
                        onChange={handlePostalCode2Change}
                        onBlur={handlePostalCode2Blur}
                        className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                      />
                      {postalCode2ndPurchaserError && (
                        <p className="text-red-500 text-xs mt-1">
                          {postalCode2ndPurchaserError}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="PhoneNumber" className="buy-unit-labels">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="PhoneNumber"
                        placeholder="Enter your phone number"
                        value={phoneNumber2ndPurchaser}
                        onChange={handlePhoneNumber2Change}
                        onBlur={handlePhoneNumber2Blur}
                        className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                      />
                      {phoneNumber2ndPurchaserError && (
                        <p className="text-red-500 text-xs mt-1">
                          {phoneNumber2ndPurchaserError}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full lg:w-1/2">
                      <label htmlFor="Birthdate" className="buy-unit-labels">
                        Birthdate
                      </label>
                      <input
                        type="date"
                        name="Birthdate"
                        value={birthdate2ndPurchaser}
                        onChange={handleBirthdate2Change}
                        className="text-sm md:text-base  font-Lato  focus:border-[#BBBBBB] px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* email */}
              <div className="mt-6">
                <div className="form-name flex flex-col">
                  <h4 className="buy-unit-headings mb-3">Email</h4>
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
                    <div className="flex flex-col w-full">
                      <label htmlFor="Email" className="buy-unit-labels">
                        Email
                      </label>
                      <input
                        type="text"
                        name="Email"
                        placeholder="Enter your email"
                        value={email2ndPurchaser}
                        onChange={handleEmail2Change}
                        onBlur={handleEmailBlur}
                        className="placeholder:text-[#BBBBBB] text-sm md:text-base focus:border-[#BBBBBB]  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                      />
                      {email2ndPurchaserError && (
                        <p className="text-red-500 text-xs mt-1">
                          {email2ndPurchaserError}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label htmlFor="ConfirmEmail" className="buy-unit-labels">
                        Confirm Email
                      </label>
                      <input
                        type="text"
                        name="ConfirmEmail"
                        placeholder="Confirm your email"
                        value={confirmEmail2ndPurchaser}
                        onChange={handleConfirmEmail2Change}
                        onBlur={handleConfirmEmail2Blur}
                        className="placeholder:text-[#BBBBBB] text-sm md:text-base focus:border-[#BBBBBB]  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                      />
                      {confirmEmail2ndPurchaserError && (
                        <p className="text-red-500 text-xs mt-1">
                          {confirmEmail2ndPurchaserError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* occuption */}
              <div className="form-name flex flex-col mt-6">
                <h4 className="buy-unit-headings mb-4">Occupation</h4>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-3 mb-3">
                  <div className="flex flex-col w-full">
                    <label htmlFor="JobTitle" className="buy-unit-labels">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="JobTitle"
                      placeholder="Enter your job title"
                      value={jobTitle2ndPurchaser}
                      onChange={handleJobTitle2Change}
                      className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                    />
                    {jobTitle2ndPurchaserError && (
                      <p className="text-red-500 text-xs mt-1">
                        {jobTitle2ndPurchaserError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="EmployerName" className="buy-unit-labels">
                      Employer Name
                    </label>
                    <input
                      type="text"
                      name="EmployerName"
                      placeholder="Enter your employer name"
                      value={employerName2ndPurchaser}
                      onChange={handleEmployerName2Change}
                      className="placeholder:text-[#BBBBBB] text-sm  focus:border-[#BBBBBB] md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                    />
                    {employerName2ndPurchaserError && (
                      <p className="text-red-500 text-xs mt-1">
                        {employerName2ndPurchaserError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="Sin" className="buy-unit-labels">
                    SIN
                  </label>
                  <input
                    type="text"
                    name="Sin"
                    placeholder="Enter your SIN"
                    value={sin2ndPurchaser}
                    onChange={handleSin2Change}
                    className="placeholder:text-[#BBBBBB]  focus:border-[#BBBBBB] text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
                  />
                  {sin2ndPurchaserError && (
                    <p className="text-red-500 text-xs mt-1">
                      {sin2ndPurchaserError}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
          {/* buy type */}
          <div className="mb-3">
            <div className="form-name flex flex-col">
              <h4 className="buy-unit-labels">
                Are you an investor or buying for yourself/your family (end
                user)?
              </h4>
              <div className="flex items-center gap-7">
                <div>
                  <input
                    type="radio"
                    id="Investor"
                    name="buyerType"
                    value="Investor"
                    checked={buyerType === "Investor"}
                    onChange={handleBuyerTypeChange}
                    className="text-[#BBBBBB]"
                  />
                  <label htmlFor="Investor" className="ml-3 text-black">
                    Investor
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="EndUser"
                    name="buyerType"
                    value="End User"
                    checked={buyerType === "End user"}
                    onChange={handleBuyerTypeChange}
                    className="text-[#BBBBBB]"
                  />
                  <label htmlFor="EndUser" className="ml-3 text-black">
                    End User
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* want parking */}
          <div className="form-name flex flex-col mb-3">
            <h4 className="buy-unit-labels">
              Do you want to buy parking (if your suite qualifies for parking)?
            </h4>
            <div className="flex items-center gap-7">
              <div>
                <input
                  type="radio"
                  id="YesParking"
                  name="wantParking"
                  value="Yes"
                  checked={wantParking === "Yes"}
                  onChange={handleWantParkingChange}
                  className="text-[#BBBBBB]"
                />
                <label htmlFor="YesParking" className="ml-3 text-black">
                  Yes
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="NoParking"
                  name="wantParking"
                  value="No"
                  checked={wantParking === "No"}
                  onChange={handleWantParkingChange}
                  className="text-[#BBBBBB]"
                />
                <label htmlFor="NoParking" className="ml-3 text-black">
                  No
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="NotApplicableParking"
                  name="wantParking"
                  value="Not Applicable"
                  checked={wantParking === "Not Applicable"}
                  onChange={handleWantParkingChange}
                  className="text-[#BBBBBB]"
                />
                <label
                  htmlFor="NotApplicableParking"
                  className="ml-3 text-black"
                >
                  Not Applicable
                </label>
              </div>
            </div>
          </div>
          {/* want locker */}
          <div className="mb-8">
            <div className="form-name flex flex-col">
              <h4 className="buy-unit-labels">
                Do you want to buy a locker (if available)?
              </h4>
              <div className="flex items-center gap-3">
                <div>
                  <input
                    type="radio"
                    id="YesLocker"
                    name="wantLocker"
                    value="Yes"
                    checked={wantLocker === "Yes"}
                    onChange={handleWantLockerChange}
                    className="text-[#BBBBBB]"
                  />
                  <label htmlFor="YesLocker" className="ml-2 text-black">
                    Yes
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="NoLocker"
                    name="wantLocker"
                    value="No"
                    checked={wantLocker === "No"}
                    onChange={handleWantLockerChange}
                    className="text-[#BBBBBB]"
                  />
                  <label htmlFor="NoLocker" className="ml-2 text-black">
                    No
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="NotApplicableLocker"
                    name="wantLocker"
                    value="Not Applicable"
                    checked={wantLocker === "Not Applicable"}
                    onChange={handleWantLockerChange}
                    className="text-[#BBBBBB]"
                  />
                  <label
                    htmlFor="NotApplicableLocker"
                    className="ml-3 text-black"
                  >
                    Not Applicable
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Are you a Canadian Citizen/PR/International buyer */}
          <div className="mb-8">
            <div className="form-name flex flex-col">
              <h4 className="buy-unit-labels">
                Are you a Canadian Citizen/PR/International buyer
              </h4>
              <div className="flex items-center gap-3">
                <div>
                  <input
                    type="radio"
                    id="YesisCanadianCitizen"
                    name="isCanadianCitizen"
                    value="Yes"
                    checked={isCanadianCitizenStr === "Yes"}
                    onChange={handleIsCAnChange}
                    className="text-[#BBBBBB]"
                  />
                  <label
                    htmlFor="isCanadianCitizenYes"
                    className="ml-2 text-black"
                  >
                    Yes
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="NoisCanadianCitizen"
                    name="isCanadianCitizen"
                    value="No"
                    checked={isCanadianCitizenStr === "No"}
                    onChange={handleIsCAnChange}
                    className="text-[#BBBBBB]"
                  />
                  <label
                    htmlFor="NoisCanadianCitizen"
                    className="ml-2 text-black"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* note */}

          <div className="form-name flex flex-col">
            <h4 className="buy-unit-labels">Note</h4>
            <textarea
              value={note}
              onChange={handleNoteChange}
              className={`placeholder:text-[#BBBBBB] focus:border-[#BBBBBB]  text-sm md:text-base  font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border text-black ${
                noteError ? "border-red-500" : "border-[#434343] "
              }`}
              rows="4"
              placeholder="Enter your note..."
            />
            {noteError && (
              <p className="text-red-500 text-xs mt-1">{noteError}</p>
            )}
          </div>

          {/* upload file */}
          <div className="form-name flex flex-col mt-4">
            <h4 className="buy-unit-labels">
              Upload Driver’s License or Passport or PR card
            </h4>
            <p className=" text-red-500 text-xs lg:text-sm">
              *Minimum 2 files Required.
            </p>
            <div className="h-[137px] lg:h-[169px] flex justify-center items-center border border-[#434343] rounded focus:border-[#BBBBBB]">
              <label htmlFor="fileupload" className="space-y-2 cursor-pointer">
                {/* <p className="text-[#737373] font-normal text-base">
                  Drop files here or
                </p> */}
                <p className="bg-primary px-3 py-2 text-white rounded-[4px] text-center">
                  Select files
                </p>
              </label>
              <input
                type="file"
                id="fileupload"
                multiple
                onChange={handleFileChange}
                className=" hidden text-sm md:text-base  font-Lato  px-3 py-2 bg-white font-normal outline-none border border-[#434343] "
              />
              <button
                type="button"
                onClick={handleFileUpload}
                className="hidden mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Upload Files
              </button>
            </div>
            {uploadError && (
              <p className="text-red-500 text-xs mt-2">{uploadError}</p>
            )}
            {uploadedFiles.length > 0 && (
              <div className="mt-2">
                <h5 className="text-black">Uploaded Files:</h5>
                <ul>
                  {uploadedFiles.map((fileName, index) => (
                    <li key={index} className="text-black">
                      {fileName.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* sales person */}
          <div className="mt-6 mb-8 ">
            <label htmlFor="salesperson" className="buy-unit-labels block">
              Name of Real Estate Salesperson who helped you
            </label>
            {/* <select
              id="salesperson"
              name="salesperson"
              value={selectedSalesperson}
              onChange={(e) => setSelectedSalesperson(e.target.value)}
              className="w-full text-sm md:text-base placeholder:text-black focus:border-[#BBBBBB]  font-Lato  px-3 py-2 bg-white font-normal outline-none border border-[#434343] text-black rounded"
            >
              <option value="other" className="text-black">
                Other
              </option>
              {salespersons.map((salesperson, index) => (
                <option key={index} value={salesperson} className="text-black">
                  {salesperson}
                </option>
              ))}
            </select> */}
            <input
              type="text"
              name="salesperson"
              placeholder="Enter Sales person name"
              value={selectedSalesperson}
              onChange={handleSalesPersonChange}
              className="placeholder:text-[#BBBBBB] focus:border-[#BBBBBB] text-sm md:text-base w-full font-Lato  px-3 py-2 rounded bg-white font-normal outline-none border border-[#434343] text-black"
            />
            {salesPersonError && (
              <p className="text-red-500 text-xs mt-1">{salesPersonError}</p>
            )}
          </div>

          {/* submit button */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-primary px-3 py-2 text-white w-full lg:w-1/4 rounded"
            >
              Buy your unit now!
            </button>
          </div>
        </form>
      </section>
      <Toaster position="top-center" />
    </div>
  );
}
