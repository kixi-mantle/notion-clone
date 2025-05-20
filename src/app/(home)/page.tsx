import Link from "next/link"
import { Navbar } from "./Navbar" 
import { TemplateGallery } from "./template-gallery"
import { getUser } from "../../getUser"

const Home = async() =>{

    const user = await getUser();
    console.log(user);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white">
                <Navbar/>
            </div>
                <div className="mt-16">
                    Click <Link href={'/documents/123'}>
                    <span className="text-blue-500 underline">&nbsp;here&nbsp;</span>
                    </Link> to go to document id
                </div>
                <div className="mt-16">
                    <TemplateGallery/>
                </div>

        </div>
    )
}

export default Home