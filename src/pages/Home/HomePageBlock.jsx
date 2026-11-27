import PageBlock from "../../components/ui/PageBlock/PageBlock";
import MovieShowSlider from "../../components/ui/MovieShowSlider/MovieShowSlider";

export default function HomePageBlock({ title, name, actions = null, moviesOrShows, moviesFnc = undefined, showsFnc = undefined, fncArgs = []}) {
  return (
    <PageBlock
      title={title}
      name={`${name} main-page__block`}
      actions={actions}
    >
      <MovieShowSlider
        moviesOrShows={moviesOrShows}
        moviesFnc={moviesFnc}
        showsFnc={showsFnc}
        fncArgs={fncArgs}
        sliderClasses={'main-page-block__slider'}
      />
    </PageBlock>
  );
}