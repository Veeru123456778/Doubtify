import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SliderComp = ({Files})=>{
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
      };

      const transformUrl = (url) => {
        // Apply transformations: resize to 800x600, auto format and quality
        return `${url.replace('/upload/', '/upload/f_auto,q_auto/')}`;
      };

      return(
        <>
        {Files.length>1 && <Slider  {...sliderSettings}>
        {Files.map((file, index) => (
            <div key={index}>
              <img src={transformUrl(file)} alt={`image-${index}`} className="h-80 w-full overflow-hidden mt-3 mb-3" />
            </div>
          ))}
          </Slider>
        }
          {Files.length===1 && Files.map((file, index) => (
              <div key={index}>
                <img src={transformUrl(file)} alt={`image-${index}`} className="mt-3 mb-3" />
              </div>
            ))}
            </>
      )
}

export default SliderComp;