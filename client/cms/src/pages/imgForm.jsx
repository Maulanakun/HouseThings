import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ImgUrl = () => {
  const [inputFile, setInputFile] = useState(null);
  const navigate = useNavigate();
  const { ProductId } = useParams();

  const inputOnChangeHandler = (e) => {
    const inputFile = e.target.files[0];
    setInputFile(inputFile);
  };

  const formOnSubmitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    // Membuat objek FormData
    const formData = new FormData();
    formData.append("img", inputFile);

    try {
      const response = await axios.patch(
        `https://anasendiri.cloud/product/${ProductId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      navigate("/product");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form onSubmit={formOnSubmitHandler}>
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={inputOnChangeHandler}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        <button type="submit">Upload</button>
      </form>
    </>
  );
};
export default ImgUrl;
