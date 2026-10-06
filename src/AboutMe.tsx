const image = import.meta.env.BASE_URL + 'images/forma-reference.png'

export default function AboutMe() {
  return (
    <section className="about-page" aria-labelledby="about-title">
      <div className="about-intro">
        <p className="eyebrow">ABOUT ME / ARCHITECT</p>
        <h1 id="about-title">Aske<br /><em>Bugge.</em></h1>
        <p className="about-lead">Spaces with purpose.<br />Objects with character.</p>
      </div>
      <figure className="about-image">
        <img src={image} alt="A wood and leather chair in a bright room with natural materials" width="1200" height="1200" fetchPriority="high" />
        <figcaption>A little inspiration: honest materials, natural light, simple forms.</figcaption>
      </figure>
      <div className="about-bio">
        <p className="eyebrow">A NOTE FROM ASKE</p>
        <h2>Design starts<br />with <em>everyday life.</em></h2>
        <div className="about-prose">
          <p>I'm Aske Bugge, an architect drawn to the quiet details that make a place feel like home: the grain of wood, the way light falls across a room, and a chair that feels just right.</p>
          <p>My approach is simple. Start with how a space is used, choose materials with care, and leave room for life to happen. I like furniture that belongs in a room without demanding all its attention.</p>
          <p>Form & Field is a small exploration of that idea — thoughtful pieces, warm textures, and a little less noise.</p>
          <a className="primary" href={`${import.meta.env.BASE_URL}#collection`}>Explore the collection <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
