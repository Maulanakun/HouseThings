import { useEffect, useState } from "react";
import image from "../../public/images/house_5.png";
import Banner from "../components/banner";
import Features from "../components/features";
import Header from "../components/header";
import Pagination from "../components/pagination";
import Produtcs from "../components/product";
import axios from "axios";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const onChangeQuery = (e) => {
    setQuery(e.target.name);
    setQueryValue(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    fetchData(`/?${query}=${queryValue}`);
  };

  const fetchData = async (searchQuery = "") => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://anasendiri.cloud/pubReadProduct${searchQuery}`
      );
      setProductList(response.data.result.data);
      console.log(response.data.result.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ambil data saat komponen dipasang
    fetchData();
  }, []);
  return (
    <>
      {/* <!-- header start --> */}
      <Header onChangeQuery={onChangeQuery} submitSearch={submitSearch} />
      {/* <!-- header end --> */}
      <Banner />
      {/* Banner Start */}

      {/* Banner End */}
      {/* features start */}
      <Features />
      {/* features end */}

      {/* product start */}
      <Produtcs productList={productList} loading={loading} />
      {/* product end */}

      {/* pagination start */}
      <Pagination />
      {/* pagination end */}
    </>
  );
};

export default Home;
