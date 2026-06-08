import './App.css'
import Header from './components/Header'
import Card from './components/Card'
import { useState } from 'react'
import { FcGenericSortingAsc, FcGenericSortingDesc } from 'react-icons/fc'

function App() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('AI')
  const [desc, setDesc] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const [ideas, setIdeas] = useState([
    {
      id: 1,
      category: 'AI',
      title: '제조 공정 불량 자동 검출',
      desc: '생산 라인 영상을 학습해 불량품을 실시간으로 가려내는 시스템.',
    },
    {
      id: 2,
      category: '바이오',
      title: '단백질 구조 예측 도우미',
      desc: '신약 후보 물질의 단백질 구조를 빠르게 추정해 연구 기간을 단축.',
    },
    {
      id: 3,
      category: '반도체',
      title: '소재 결함 데이터셋 구축',
      desc: '반도체 소재의 결함 사례를 모아 분석용 데이터로 정리.',
    },
  ])

  function addIdea() {
    if (title.trim() === '') {
      alert('제목을 입력해주세요')
      return
    }
    if (desc.trim() === '') {
      alert('설명을 입력해주세요')
      return
    }

    const newIdea = {
      id: Date.now(),
      category,
      title,
      desc,
    }
    setIdeas([...ideas, newIdea])
    setTitle('')
    setCategory('AI')
    setDesc('')
  }

  function deleteIdea(id) {
    setIdeas(ideas.filter((idea) => idea.id !== id))
  }

  const sortedIdeas = [...ideas].sort((a, b) => {
    const result = a.title.localeCompare(b.title, 'ko')
    return sortOrder === 'asc' ? result : -result
  })

  return (
    <div>
      <Header />

      <main>
        <section className="form-section">
          <form className="idea-form">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              placeholder="아이디어 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="category">분야</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="AI">AI</option>
              <option value="바이오">바이오</option>
              <option value="반도체">반도체</option>
              <option value="에너지">에너지</option>
              <option value="기타">기타</option>
            </select>

            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              rows={3}
              placeholder="아이디어를 간단히 설명하세요"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <button type="button" onClick={addIdea}>
              등록
            </button>
          </form>
        </section>

        <section className="sort-section">
          <span className="sort-label">제목 정렬</span>
          <div className="sort-buttons">
            <button
              type="button"
              className={`sort-btn ${sortOrder === 'asc' ? 'active' : ''}`}
              onClick={() => setSortOrder('asc')}
              aria-label="제목 오름차순"
              title="오름차순"
            >
              <FcGenericSortingAsc />
            </button>
            <button
              type="button"
              className={`sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
              onClick={() => setSortOrder('desc')}
              aria-label="제목 내림차순"
              title="내림차순"
            >
              <FcGenericSortingDesc />
            </button>
          </div>
        </section>

        <section className="card-grid">
          {sortedIdeas.map((idea) => (
            <Card
              key={idea.id}
              category={idea.category}
              title={idea.title}
              desc={idea.desc}
              onDelete={() => deleteIdea(idea.id)}
            />
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
