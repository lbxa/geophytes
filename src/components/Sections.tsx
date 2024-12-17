import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export const Sections = () => {
  return (
    <Parallax pages={3}>
      <ParallaxLayer offset={0} speed={0.5}>
        <div>Hello</div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.5}>
        <div>Hello</div>
      </ParallaxLayer>
    </Parallax>
  );
};
