import Slider from '../Slider/Slider';
import Card from '../Card/Card';

export default function PageSlider({ items, sliderClasses = undefined }) {
  return (
    <Slider classes={sliderClasses}>
      {
        items.map(item => (
          <Card key={item.id} extraClasses={'card-1'} {...item} />
        ))
      }
    </Slider>
  );
}