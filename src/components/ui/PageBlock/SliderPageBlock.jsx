import PageBlock from "./PageBlock";
import MediaSlider from "../MediaSlider/MediaSlider";

export default function SliderPageBlock({ title, name, actions = null, fetchFnc, normalizeFnc, fncArgs = [], sliderClasses = undefined }) {
  return (
    <PageBlock
      title={title}
      name={`${name}`}
      actions={actions}
    >
      <MediaSlider 
        fetchFnc={fetchFnc}   
        fncArgs={fncArgs}
        normalizeFnc={normalizeFnc}
        sliderClasses={sliderClasses}
      />
    </PageBlock>
  );
}