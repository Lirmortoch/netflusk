import PageBlock from "./PageBlock";
import MediaSlider from "../PageSlider/MediaSlider";

export default function SliderPageBlock({ title, name, actions = null, moviesOrShows, moviesFnc = undefined, showsFnc = undefined, fncArgs = []}) {
  return (
    <PageBlock
      title={title}
      name={`${name} main-page__block`}
      actions={actions}
    >
      <MediaSlider
        moviesOrShows={moviesOrShows}
        moviesFnc={moviesFnc}
        showsFnc={showsFnc}
        fncArgs={fncArgs}
      />
    </PageBlock>
  );
}