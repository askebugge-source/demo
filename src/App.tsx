import { useRef, useState } from 'react'
import './App.css'

type Category = 'All pieces' | 'Seating' | 'Tables' | 'Lighting'
type Product = { id: number; name: string; category: Category; price: number; color: string; kind: 'chair' | 'sofa' | 'table' | 'lamp'; detail: string }
const products: Product[] = [
  { id: 1, name: 'Forma lounge chair', category: 'Seating', price: 425, color: '#a46b46', kind: 'chair', detail: 'Oak · cognac upholstery' },
  { id: 2, name: 'Sunday sofa', category: 'Seating', price: 1495, color: '#c4bc9b', kind: 'sofa', detail: 'Linen blend · natural olive' },
  { id: 3, name: 'Arc coffee table', category: 'Tables', price: 295, color: '#916441', kind: 'table', detail: 'Solid oak · warm finish' },
  { id: 4, name: 'Pebble table lamp', category: 'Lighting', price: 145, color: '#b8734f', kind: 'lamp', detail: 'Ceramic · terracotta' },
  { id: 5, name: 'Cloud lounge chair', category: 'Seating', price: 495, color: '#c6c0b2', kind: 'chair', detail: 'Bouclé · soft ivory' },
  { id: 6, name: 'Gather dining table', category: 'Tables', price: 795, color: '#b18559', kind: 'table', detail: 'Solid ash · natural finish' },
]
const money = (value: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
function Furniture({ kind, color, label }: { kind: Product['kind']; color: string; label: string }) {
  return <svg viewBox="0 0 480 360" role="img" aria-label={label}>
    <ellipse cx="240" cy="309" rx="153" ry="16" fill="#29241d" opacity=".09" />
    {kind === 'chair' && <g>
      <path d="M155 209 145 309M306 215l22 94M187 242l-5 67M285 243l8 66" stroke="#745139" strokeWidth="12" strokeLinecap="round" />
      <path d="M155 209 145 122q-3-32 34-38l82-8q34-2 42 31l23 105Z" fill={color} />
      <path d="m159 122 85-9q24-2 28 18l15 67-117 8Z" fill="#fff" opacity=".14" />
      <path d="M154 205q67-22 163-4l19 32q-97 33-181 9Z" fill={color} />
      <path d="m141 183 22 49M322 182l13 51" stroke="#79573d" strokeWidth="11" strokeLinecap="round" />
      <path d="m131 180 49-9m119 2 48 8" stroke="#ad845f" strokeWidth="12" strokeLinecap="round" />
    </g>}
    {kind === 'sofa' && <g>
      <path d="M107 276v32m266-32v32" stroke="#6f513d" strokeWidth="13" />
      <rect x="89" y="132" width="301" height="130" rx="30" fill={color} />
      <rect x="108" y="139" width="125" height="83" rx="19" fill="#fff" opacity=".13" />
      <rect x="240" y="139" width="127" height="83" rx="19" fill="#fff" opacity=".13" />
      <rect x="82" y="212" width="315" height="73" rx="19" fill={color} />
      <rect x="73" y="185" width="44" height="95" rx="16" fill={color} />
      <rect x="363" y="185" width="44" height="95" rx="16" fill={color} />
      <path d="M122 230h233m-117 0v39" stroke="#695e49" opacity=".22" strokeWidth="2" />
    </g>}
    {kind === 'table' && <g>
      <path d="m146 217-19 92m206-92 20 92m-115-96v91" stroke={color} strokeWidth="22" strokeLinecap="round" />
      <ellipse cx="240" cy="214" rx="166" ry="53" fill="#62422d" />
      <ellipse cx="240" cy="200" rx="166" ry="53" fill={color} />
      <path d="M113 195q121-42 249 0M121 210q125-39 239 0" fill="none" stroke="#f5e2bf" opacity=".16" strokeWidth="3" />
    </g>}
    {kind === 'lamp' && <g>
      <path d="M211 210q-48 88 29 90t29-90Z" fill={color} />
      <path d="M230 230q-19 49-5 57" fill="none" stroke="#fff" strokeWidth="8" opacity=".12" />
      <path d="M237 217v-45" stroke="#6c5039" strokeWidth="8" />
      <path d="m195 81-56 111q98 26 202 0L285 81Z" fill="#e4d3b0" />
      <ellipse cx="240" cy="81" rx="45" ry="10" fill="#f2e6cc" />
      <path d="m212 92-25 94m80-94 25 94" stroke="#fff" opacity=".22" strokeWidth="3" />
    </g>}
  </svg>
}
function App() {
  const [category, setCategory] = useState<Category>('All pieces')
  const [bag, setBag] = useState<Record<number, number>>({})
  const [notice, setNotice] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const count = Object.values(bag).reduce((a, b) => a + b, 0)
  const total = products.reduce((sum, product) => sum + product.price * (bag[product.id] || 0), 0)
  const changeQuantity = (id: number, change: number) => { setNotice(''); setBag(previous => ({ ...previous, [id]: Math.max(0, (previous[id] || 0) + change) })) }
  return <>
    <div className="announcement">Considered furniture. Everyday living. <span>A collection for a slower home.</span></div>
    <header><a className="logo" href="#">form<span>&</span>field</a><nav aria-label="Main navigation"><a href="#collection">Shop the collection</a><a href="#story">Our philosophy</a></nav><button className="bag-button" onClick={() => { setNotice(''); dialog.current?.showModal() }}>Bag <span>{count}</span></button></header>
    <main>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">THE EVERYDAY COLLECTION / 01</p><h1>A little less.<br />A little <em>better.</em></h1><p>Thoughtful shapes. Honest materials. Furniture that makes room for the way you live.</p><a className="primary" href="#collection">Find your next favourite <span>↗</span></a><div className="hero-note"><span>01 — 06</span> Designed for the everyday.</div></div>
        <div className="hero-art"><div className="sunlight" /><div className="art-caption">A quiet corner.<br />A good place to begin.</div><Furniture kind="chair" color="#a46b46" label="Illustration of the Forma lounge chair in cognac" /><span className="art-label">FORMA LOUNGE CHAIR <span>€425</span></span></div>
      </section>
      <div className="values"><span>Timeless by design</span><span>Materials with character</span><span>Made for real life</span></div>
      <section id="collection" className="collection"><div className="section-heading"><div><p className="eyebrow">GOOD THINGS, WELL CONSIDERED</p><h2>Make yourself at home.</h2></div><p>Six pieces. Countless ways to live.</p></div>
        <div className="filters" role="group" aria-label="Filter products">{(['All pieces', 'Seating', 'Tables', 'Lighting'] as Category[]).map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}<span>{products.filter(product => category === 'All pieces' || product.category === category).length} pieces</span></div>
        <div className="product-grid">{products.filter(product => category === 'All pieces' || product.category === category).map(product => <article key={product.id} className="product"><div className="product-art"><Furniture kind={product.kind} color={product.color} label={`${product.name}, ${product.detail}`} /><button aria-label={`Add ${product.name} to bag`} onClick={() => { changeQuantity(product.id, 1); setNotice(`${product.name} added to your bag.`) }}>+</button>{product.id === 1 && <span className="tag">The everyday favourite</span>}</div><div className="product-title"><h3>{product.name}</h3><span>{money(product.price)}</span></div><p>{product.detail}</p></article>)}</div>
        <p className="status" role="status">{notice}</p>
      </section>
      <section id="story" className="story"><p className="eyebrow">THE FORM & FIELD PHILOSOPHY</p><h2>Good design feels<br />right <em>at home.</em></h2><p>We believe the best rooms are lived in. A favourite chair, a table for gathering, a light left on. Our collection celebrates simple forms and warm materials, with space for your own story.</p><span>Fewer things. More meaning.</span></section>
    </main>
    <footer><a className="logo" href="#">form<span>&</span>field</a><p>A furniture storefront demo · Illustrative products and prices</p><a href="#collection">Back to the collection ↑</a></footer>
    <dialog ref={dialog} className="bag-dialog"><div className="dialog-heading"><h2>Your bag <span>({count})</span></h2><button aria-label="Close shopping bag" onClick={() => dialog.current?.close()}>×</button></div>{count === 0 ? <div className="empty"><p>A little room for something lovely.</p><button className="primary" onClick={() => dialog.current?.close()}>Explore the collection ↗</button></div> : <><div className="bag-items">{products.filter(product => bag[product.id] > 0).map(product => <div className="bag-item" key={product.id}><div className="bag-thumbnail"><Furniture kind={product.kind} color={product.color} label={product.name} /></div><div><h3>{product.name}</h3><p>{money(product.price)}</p><div className="quantity"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => changeQuantity(product.id, -1)}>−</button><span>{bag[product.id]}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => changeQuantity(product.id, 1)}>+</button></div></div><button className="remove" aria-label={`Remove ${product.name}`} onClick={() => { setNotice(''); setBag(previous => ({ ...previous, [product.id]: 0 })) }}>×</button></div>)}</div><div className="subtotal"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="demo-note">Demo only. No orders or payments are processed.</p><button className="primary checkout" onClick={() => setNotice('Thanks for trying the demo! Your bag is ready, but checkout is not connected to payments.')}>Try demo checkout ↗</button><p role="status" className="checkout-notice">{notice}</p></>}</dialog>
  </>
}
export default App
