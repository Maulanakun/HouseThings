const Banner = () => {
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-center py-36"
        style={{
          backgroundImage: "url('../../public/images/banner-bg.jpg' )",
        }}
      >
        <div className="container">
          <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
            best collection for <br /> home decoration
          </h1>
          <p>
            Disini kami menyediakan furniture yang nyaman dan kuat <br />
            Tidak hanya nyaman furniture ini sangat estetik sangat cocok dirumah
            anda
          </p>
          <div className="mt-12">
            <a
              href="#"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                            rounded-md hover:bg-transparent hover:text-primary"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
