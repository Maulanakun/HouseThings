const Features = () => {
  return (
    <>
    <div className="container py-16">
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src="../../public/images/van.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                <div>
                    <h4 className="font-medium capitalize text-lg">Gratis Ongkir</h4>
                    <p className="text-gray-500 text-sm">Order over Rp.1.500.000.00</p>
                </div>
            </div>
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src="../../public/images/money.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                <div>
                    <h4 className="font-medium capitalize text-lg">Money Returns</h4>
                    <p className="text-gray-500 text-sm">Garansi sampai 30 Hari</p>
                </div>
            </div>
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src="../../public/images/call-chat.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                <div>
                    <h4 className="font-medium capitalize text-lg">24/7 Support</h4>
                    <p className="text-gray-500 text-sm">Customer support</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
export default Features