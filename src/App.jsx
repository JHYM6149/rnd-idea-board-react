import './App.css'
import Header from './components/Header'
import Card from './components/Card'
import { useState, useEffect } from 'react'
import { FcGenericSortingAsc, FcGenericSortingDesc } from 'react-icons/fc'
import { supabase } from './supabaseClient'

// Supabase ideas 테이블 컬럼: id, category, title, description
// 폼 입력 state는 desc, DB read/write는 description 컬럼명 사용

function App() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('AI')
  const [desc, setDesc] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIdeas()
  }, [])

  async function fetchIdeas() {
    setLoading(true)
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('불러오기 실패:', error)
      alert('데이터를 불러오지 못했습니다. Supabase 설정을 확인해주세요.')
      setLoading(false)
      return
    }

    setIdeas(
      data.map((idea) => ({
        ...idea,
        desc: idea.description, // DB: description → Card props: desc
      }))
    )
    setLoading(false)
  }

  async function addIdea() {
    if (title.trim() === '') {
      alert('제목을 입력해주세요')
      return
    }
    if (desc.trim() === '') {
      alert('설명을 입력해주세요')
      return
    }

    const { data, error } = await supabase
      .from('ideas')
      .insert([{ category, title, description: desc }]) // DB 컬럼명은 description
      .select()

    if (error) {
      console.error('등록 실패:', error)
      alert('등록에 실패했습니다.')
      return
    }

    setIdeas([
      ...ideas,
      { ...data[0], desc: data[0].description },
    ])
    setTitle('')
    setCategory('AI')
    setDesc('')
  }

  async function deleteIdea(id) {
    const { error } = await supabase.from('ideas').delete().eq('id', id)

    if (error) {
      console.error('삭제 실패:', error)
      alert('삭제에 실패했습니다.')
      return
    }

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
          {loading ? (
            <p>데이터를 불러오는 중...</p>
          ) : sortedIdeas.length === 0 ? (
            <p>등록된 아이디어가 없습니다.</p>
          ) : (
            sortedIdeas.map((idea) => (
              <Card
                key={idea.id}
                category={idea.category}
                title={idea.title}
                desc={idea.desc}
                onDelete={() => deleteIdea(idea.id)}
              />
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default App
