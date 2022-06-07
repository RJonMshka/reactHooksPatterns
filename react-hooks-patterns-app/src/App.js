import logo from './logo.svg';
import './App.css';
import Expandable from './Components/Expandable';
import { useEffect, useState, useRef } from 'react';
import useExpanded from './Hooks/useExpanded';
import useEffectAfterMount from './Hooks/useEffectAfterMount';


const information = [
  {
    header: 'Why everyone should live forrever',
    note: 'This is highly sensitive information on how to prevent death!!!!'
  },
  {
    header: 'The internet disappears',
    note:
      'I just uncovered the biggest threat to the internet. The internet disappears in 301 seconds. Save yourself'
  },
  {
    header: 'The truth about Elon musk and Mars!',
    note: 'Nobody tells you this. Elon musk ... News coming soon.'
  }
]

function App() {
  const { expanded, toggle } = useExpanded(false);

  useEffectAfterMount(() => {
    console.log("not called on first render");
  }, [expanded])

  const [activeIndex, setActiveIndex] = useState(null);
  const onExpand = e => setActiveIndex(e.target.dataset.index);
  return (
    <div className="App">
     {
        information.map(({ header, note }, index) => {
          return (
            <Expandable
              key={index}
              onExpand={onExpand}
              shouldExpand={index === +activeIndex}>
              <Expandable.Header data-index={index}>{header}</Expandable.Header>
              <Expandable.Icon />
              <Expandable.Body>{note}</Expandable.Body>
            </Expandable>
          )
        })
      }
      <div style={{ marginTop: '3rem' }}>
        <button onClick={toggle}>Click to view awesomeness...</button>
        {expanded ? <p>{'😎'.repeat(50)}</p> : null}
      </div>
    </div>

  );
}

export default App;
