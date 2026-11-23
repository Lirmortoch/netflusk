import Slider from '../../components/ui/Slider/Slider';
import Card from '../../components/ui/Card/Card';

export default function HomePageSlider({ items, sliderClasses = null }) {
  return (
    <Slider classes={sliderClasses}>
      {
        items.map(item => (
          <Card key={item.id} {...item} />
        ))
      }
    </Slider>
  );
}