import { useRef, useState } from 'react'
import './App.css'
import AboutMe from './AboutMe'

type Category = 'All pieces' | 'Seating' | 'Tables' | 'Lighting'
type Product = { id: number; name: string; category: Category; price: number; image: string; position?: string; detail: string }
const products: Product[] = [
  { id: 1, name: 'Forma lounge chair', category: 'Seating', price: 425, image: 'forma-reference.png', detail: 'Wood · saddle leather' },
  { id: 2, name: 'Sunday sofa', category: 'Seating', price: 1495, image: 'sunday-sofa.jpg', position: '50% 55%', detail: 'Soft upholstery · sand' },
  { id: 3, name: 'Arc coffee table', category: 'Tables', price: 295, image: 'arc-table.jpg', position: '50% 65%', detail: 'Wood · natural finish' },
  { id: 4, name: 'Pebble table lamp', category: 'Lighting', price: 145, image: 'pebble-lamp.jpg', detail: 'Pleated shade · ivory' },
  { id: 5, name: 'Cloud lounge chair', category: 'Seating', price: 495, image: 'cloud-chair.jpg', position: '50% 65%', detail: 'Textured upholstery · ivory' },
  { id: 6, name: 'Gather dining table', category: 'Tables', price: 795, image: 'gather-table.jpg', detail: 'Wood · dark metal frame' },
]
const money = (value: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
const photo = (name: string) => import.meta.env.BASE_URL + 'images/' + name
function App() {
  const home = import.meta.env.BASE_URL
  const isAboutPage = window.location.pathname.endsWith('/about.html')
  const [category, setCategory] = useState<Category>('All pieces')
  const [bag, setBag] = useState<Record<number, number>>({})
  const [notice, setNotice] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const count = Object.values(bag).reduce((a, b) => a + b, 0)
  const total = products.reduce((sum, product) => sum + product.price * (bag[product.id] || 0), 0)
  const changeQuantity = (id: number, change: number) => { setNotice(''); setBag(previous => ({ ...previous, [id]: Math.max(0, (previous[id] || 0) + change) })) }
  return <>
    <header><a className="logo" href={home}>form<span>&</span>field</a><nav aria-label="Main navigation"><a href={`${home}#collection`}>Shop the collection</a><a href={`${home}#story`}>Our philosophy</a><a href={`${home}about.html`} aria-current={isAboutPage ? 'page' : undefined}>About me</a></nav><button className="bag-button" onClick={() => { setNotice(''); dialog.current?.showModal() }}>Bag <span>{count}</span></button></header>
    <main>{isAboutPage ? <AboutMe /> : <>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">FURNITURE FOR EVERYDAY LIVING</p><h1>Room to<br /><em>slow down.</em></h1><p>Simple forms. Natural textures. A quieter kind of home.</p><a className="primary" href={`${home}#collection`}>Explore the collection <span>↗</span></a></div>
        <div className="hero-art"><img src={photo('forma-reference.png')} alt="Leather and wood lounge chair in a sunlit room" fetchPriority="high" width="1200" height="1200" /></div>
      </section>
      <section id="collection" className="collection"><div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h2>Considered essentials.</h2></div><p>Six pieces. Countless ways to live.</p></div>
        <div className="filters" role="group" aria-label="Filter products">{(['All pieces', 'Seating', 'Tables', 'Lighting'] as Category[]).map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}<span>{products.filter(product => category === 'All pieces' || product.category === category).length} {category === 'Lighting' ? 'piece' : 'pieces'}</span></div>
        <div className="product-grid">{products.filter(product => category === 'All pieces' || product.category === category).map(product => <article key={product.id} className="product"><div className="product-art"><img src={photo(product.image)} alt={`${product.name}, ${product.detail}`} loading="lazy" width="900" height="1100" style={{ objectPosition: product.position }} /><button aria-label={`Add ${product.name} to bag`} onClick={() => { changeQuantity(product.id, 1); setNotice(`${product.name} added to your bag.`) }}>+</button></div><div className="product-title"><h3>{product.name}</h3><span>{money(product.price)}</span></div><p>{product.detail}</p></article>)}</div>
        <p className="status" role="status">{notice}</p>
      </section>
      <section id="story" className="story"><p className="eyebrow">OUR APPROACH</p><h2>Less, but<br /><em>well chosen.</em></h2><p>Warm materials and useful shapes. A small collection of furniture to live with, day after day.</p></section>
    </>}</main>
    <footer><a className="logo" href={home}>form<span>&</span>field</a><p>Furniture demo · Photos are illustrative</p><a href={`${home}#collection`}>Back to the collection ↑</a></footer>
    <dialog ref={dialog} className="bag-dialog"><div className="dialog-heading"><h2>Your bag <span>({count})</span></h2><button aria-label="Close shopping bag" onClick={() => dialog.current?.close()}>×</button></div>{count === 0 ? <div className="empty"><p>A little room for something lovely.</p><button className="primary" onClick={() => dialog.current?.close()}>Explore the collection ↗</button></div> : <><div className="bag-items">{products.filter(product => bag[product.id] > 0).map(product => <div className="bag-item" key={product.id}><div className="bag-thumbnail"><img src={photo(product.image)} alt={product.name} width="100" height="120" style={{ objectPosition: product.position }} /></div><div><h3>{product.name}</h3><p>{money(product.price)}</p><div className="quantity"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => changeQuantity(product.id, -1)}>−</button><span>{bag[product.id]}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => changeQuantity(product.id, 1)}>+</button></div></div><button className="remove" aria-label={`Remove ${product.name}`} onClick={() => { setNotice(''); setBag(previous => ({ ...previous, [product.id]: 0 })) }}>×</button></div>)}</div><div className="subtotal"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="demo-note">Demo only. No orders or payments are processed.</p><button className="primary checkout" onClick={() => setNotice('Thanks for trying the demo! Your bag is ready, but checkout is not connected to payments.')}>Try demo checkout ↗</button><p role="status" className="checkout-notice">{notice}</p></>}</dialog>
  </>
}
export default App
