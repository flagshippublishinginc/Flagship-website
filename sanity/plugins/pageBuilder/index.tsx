import React, {useEffect, useState, useCallback, useRef} from 'react'
import {definePlugin} from 'sanity'
import {useClient} from 'sanity'
import {DndProvider, useDrag, useDrop} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

const ItemTypes = { MODULE: 'MODULE' }
const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

const MODULE_COLORS: Record<string, string> = {
  heroModule: '#3B82F6',
  featuredCardsModule: '#10B981',
  richTextModule: '#F59E0B',
  imageGalleryModule: '#8B5CF6',
  ctaBannerModule: '#EC4899',
  testimonialModule: '#06B6D4',
  faqModule: '#EF4444',
  statsModule: '#14B8A6',
  logosModule: '#A78BFA',
  twoColumnModule: '#F97316'
}

const MODULE_ICONS: Record<string, string> = {
  heroModule: '🦸',
  featuredCardsModule: '🎴',
  richTextModule: '📝',
  imageGalleryModule: '🖼️',
  ctaBannerModule: '📢',
  testimonialModule: '💬',
  faqModule: '❓',
  statsModule: '📊',
  logosModule: '🏢',
  twoColumnModule: '⚖️'
}

function getModulePreview(module: any): string {
  const type = module._type
  switch (type) {
    case 'heroModule':
      return module.title ? `Hero: ${module.title.slice(0, 20)}` : 'Hero Section'
    case 'featuredCardsModule':
      return `Featured Cards${module.cards ? ` (${module.cards.length})` : ''}`
    case 'richTextModule':
      return 'Rich Text Content'
    case 'imageGalleryModule':
      return `Gallery${module.images ? ` (${module.images.length} images)` : ''}`
    case 'ctaBannerModule':
      return module.text ? `CTA: ${module.text.slice(0, 20)}` : 'CTA Banner'
    case 'testimonialModule':
      return `Testimonials${module.testimonials ? ` (${module.testimonials.length})` : ''}`
    case 'faqModule':
      return `FAQ${module.faqs ? ` (${module.faqs.length} items)` : ''}`
    case 'statsModule':
      return `Stats${module.stats ? ` (${module.stats.length})` : ''}`
    case 'logosModule':
      return `Logo Wall${module.logos ? ` (${module.logos.length})` : ''}`
    case 'twoColumnModule':
      return 'Two Column Section'
    default:
      return type
  }
}

function ModulePaletteItem({type}: {type: string}) {
  const [, drag] = useDrag(() => ({ type: ItemTypes.MODULE, item: {moduleType: type} }))
  const color = MODULE_COLORS[type] || '#6B7280'
  const icon = MODULE_ICONS[type] || '📦'
  
  // Minimal Sanity-like palette item
  return (
    <div
      ref={(node) => { (drag as any)(node); }}
      style={{
        padding: '8px 10px',
        marginBottom: 8,
        border: `1px solid #e6e7eb`,
        borderRadius: 6,
        cursor: 'grab',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}
    >
      <span style={{fontSize: 14, color}} aria-hidden>{icon}</span>
      <div style={{flex: 1}}>
        <span style={{fontSize: 13, color: '#111827', fontWeight: 600}}>{type.replace('Module', '')}</span>
      </div>
      <span style={{fontSize: 11, color: '#6b7280'}}>drag</span>
    </div>
  )
}

function PageBuilderTool() {
  const client = useClient({apiVersion: '2024-01-01'})
  const [pages, setPages] = useState<Array<any>>([])
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
  const [modules, setModules] = useState<Array<any>>([])
  const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null)
  const [editingModuleData, setEditingModuleData] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    client.fetch(`*[_type == "page"]{_id, title, 'slug': slug.current}`)
      .then((res: any) => { if (mounted) setPages(res || []) })
    return () => { mounted = false }
  }, [client])

  const loadPage = useCallback((id?: string) => {
    if (!id) return
    setSelectedPageId(id)
    setEditingModuleIndex(null)
    client.fetch(`*[_id == $id][0]{modules}`, {id})
      .then((doc: any) => setModules(doc?.modules || []))
  }, [client])

  const moduleTypes = [
    'heroModule', 'featuredCardsModule', 'richTextModule', 'imageGalleryModule',
    'ctaBannerModule', 'testimonialModule', 'faqModule', 'statsModule', 'logosModule', 'twoColumnModule'
  ]

  const onSave = async () => {
    if (!selectedPageId) return
    if (editingModuleIndex !== null && editingModuleData) {
      const newModules = [...modules]
      newModules[editingModuleIndex] = editingModuleData
      setModules(newModules)
      setEditingModuleIndex(null)
    }
    await client.patch(selectedPageId).set({modules}).commit({autoGenerateArrayKeys: true})
    loadPage(selectedPageId)
    alert('Saved')
  }

  const onEditModule = (index: number) => {
    setEditingModuleIndex(index)
    setEditingModuleData({...modules[index]})
  }

  const onCancelEdit = () => {
    setEditingModuleIndex(null)
    setEditingModuleData(null)
  }

  return (<div style={{display: 'flex', height: '100%', fontFamily: FONT, gap: 12, padding: 12}}>
      <aside style={{width: 280, borderRight: '1px solid #e6e7eb', paddingRight: 12, overflow: 'auto', background: 'transparent'}}>
        <div style={{marginBottom: 12}}>
          <h3 style={{margin: '0 0 8px 0', fontSize: 15, fontWeight: 600, color: '#111827'}}>Pages</h3>
        </div>
        <ul style={{padding: 0, listStyle: 'none', margin: 0}}>
          {pages.map(p => (
            <li key={p._id} style={{marginBottom: 6}}>
              <button
                onClick={() => loadPage(p._id)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: selectedPageId === p._id ? '#f3f4f6' : 'transparent',
                  color: '#111827',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 13,
                  textAlign: 'left'
                }}
              >
                {p.title || p.slug || p._id}
              </button>
            </li>
          ))}
        </ul>
        <div style={{margin: '18px 0 8px 0', paddingTop: 12, borderTop: '1px solid #f3f4f6'}}>
          <h4 style={{margin: '0 0 8px 0', fontSize: 13, fontWeight: 600, color: '#111827'}}>Modules</h4>
        </div>
        <div>
          {moduleTypes.map(t => (
            <ModulePaletteItem key={t} type={t} />
          ))}
        </div>
      </aside>

      <main style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12}}>
          <h2 style={{margin: 0, fontSize: 18, fontWeight: 700}}>Page Builder</h2>
          <div style={{flex: 1}} />
          {editingModuleIndex !== null && (
            <>
              <button onClick={onSave} style={{padding: '8px 14px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Save Module</button>
              <button onClick={onCancelEdit} style={{padding: '8px 14px', backgroundColor: 'transparent', color: '#6b7280', border: '1px solid #e6e7eb', borderRadius: 6, cursor: 'pointer'}}>Cancel</button>
            </>
          )}
          {editingModuleIndex === null && (
            <button onClick={onSave} disabled={!selectedPageId} style={{padding: '8px 14px', backgroundColor: selectedPageId ? '#3B82F6' : '#f3f4f6', color: selectedPageId ? 'white' : '#9ca3af', border: 'none', borderRadius: 6, cursor: selectedPageId ? 'pointer' : 'default'}}>Save Page</button>
          )}
        </div>

        <div style={{display: 'flex', gap: 12, flex: 1, minHeight: 0}}>
          <Canvas modules={modules} setModules={setModules} selectedPageId={selectedPageId} editingModuleIndex={editingModuleIndex} onEditModule={onEditModule} />
          {editingModuleIndex !== null && editingModuleData && (
            <ModuleEditor module={editingModuleData} setModule={setEditingModuleData} moduleType={editingModuleData._type} />
          )}
        </div>
      </main>
    </div>
  )
}

function Canvas({modules, setModules, selectedPageId, editingModuleIndex, onEditModule}: {modules: any[], setModules: any, selectedPageId: string | null, editingModuleIndex: number | null, onEditModule: (i: number) => void}){
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.MODULE,
    drop: (item: any) => {
      setModules((prev: any[]) => [...prev, {_type: item.moduleType}])
    }
  }))

  return (
    <div
      ref={(node) => { (drop as any)(node); }}
      style={{
        flex: 1,
        padding: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 6,
        overflow: 'auto',
        backgroundColor: '#ffffff'
      }}
    >
      {!selectedPageId && (
        <div style={{textAlign: 'center', color: '#6b7280', paddingTop: '20%'}}>
          <div style={{fontSize: 28, marginBottom: 8}}>📄</div>
          <div style={{fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 2}}>No page selected</div>
          <div style={{fontSize: 12, color: '#6b7280'}}>Choose a page from the left sidebar</div>
        </div>
      )}
      {selectedPageId && (
        <div>
          {modules.length === 0 && (
            <div style={{textAlign: 'center', color: '#6b7280', paddingTop: '18%'}}>
              <div style={{fontSize: 28, marginBottom: 8}}>➕</div>
              <div style={{fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 2}}>Empty canvas</div>
              <div style={{fontSize: 12, color: '#6b7280'}}>Drag modules from the sidebar to build your page</div>
            </div>
          )}
          {modules.map((m, i) => (
            <CanvasModule
              key={i}
              index={i}
              module={m}
              modules={modules}
              setModules={setModules}
              isEditing={editingModuleIndex === i}
              onEdit={() => onEditModule(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CanvasModule({module, index, modules, setModules, isEditing, onEdit}: {module: any, index: number, modules: any[], setModules: any, isEditing: boolean, onEdit: () => void}){
  const ref = useRef<HTMLDivElement | null>(null)
  const [, drop] = useDrop({
    accept: ItemTypes.MODULE,
    hover(item: any, monitor: any) {
      // palette item hovered - no-op
    }
  })

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.MODULE,
    item: {index, moduleType: module._type},
    collect: (monitor: any) => ({ isDragging: !!monitor.isDragging() })
  }), [module, index])

  // allow module-to-module reordering
  const [, reorderDrop] = useDrop({
    accept: ItemTypes.MODULE,
    hover(item: any, monitor: any) {
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === undefined) return
      if (dragIndex === hoverIndex) return
      // perform reorder
      setModules((prev: any[]) => {
        const copy = [...prev]
        const [removed] = copy.splice(dragIndex, 1)
        copy.splice(hoverIndex, 0, removed)
        return copy
      })
      item.index = hoverIndex
    }
  })

  const setRef = (node: HTMLDivElement | null) => {
    ref.current = node
    ;(drag as any)(node)
    ;(drop as any)(node)
    ;(reorderDrop as any)(node)
  }

  const onRemove = () => setModules((prev: any[]) => prev.filter((_, i) => i !== index))
  const color = MODULE_COLORS[module._type] || '#6B7280'
  const icon = MODULE_ICONS[module._type] || '📦'
  const preview = getModulePreview(module)

  return (
    <div
      ref={setRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: 12,
        marginBottom: 8,
        border: `1px solid ${isEditing ? '#3B82F6' : '#e6e7eb'}`,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        cursor: 'grab',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        transition: 'all 0.12s ease'
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 12, flex: 1}}>
        <span style={{fontSize: 16, color: '#6b7280'}}>{icon}</span>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <strong style={{color: '#111827', fontSize: 13, fontWeight: 600}}>{module._type.replace('Module', '')}</strong>
          <span style={{fontSize: 12, color: '#6b7280', marginTop: 2, fontWeight: 500}}>{preview}</span>
        </div>
      </div>
      <div style={{display: 'flex', gap: 8}}>
        <button onClick={onEdit} style={{padding: '6px 10px', backgroundColor: 'transparent', color: '#2563eb', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 600}}>Edit</button>
        <button onClick={onRemove} style={{padding: '6px 10px', backgroundColor: 'transparent', color: '#ef4444', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 600}}>Remove</button>
      </div>
    </div>
  )
}

function ModuleEditor({module, setModule, moduleType}: {module: any, setModule: any, moduleType: string}){
  const handleChange = (key: string, value: any) => {
    setModule((prev: any) => ({...prev, [key]: value}))
  }

  const icon = MODULE_ICONS[moduleType] || '📦'

  return (
    <div style={{width: 360, padding: 16, borderLeft: '1px solid #e5e7eb', overflow: 'auto', backgroundColor: 'white', display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 14, borderBottom: '2px solid #f0f1f3'}}>
          <span style={{fontSize: 28}}>{icon}</span>
          <div>
            <h3 style={{margin: 0, fontSize: 15, fontWeight: 700, color: '#1f2937'}}>Edit {moduleType.replace('Module', '')}</h3>
            <p style={{margin: '2px 0 0 0', fontSize: 11, color: '#6b7280'}} onMouseEnter={() => {}} onMouseLeave={() => {}}>Configure module properties</p>
          </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {moduleType === 'heroModule' && (
          <>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6}}>Title</label>
              <input
                type="text"
                onChange={(e) => handleChange('title', e.target.value)}
                value={module.title || ''}
                style={{width: '100%', padding: '10px', border: '1px solid #e6e7eb', borderRadius: 8, fontSize: 14, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'}}
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6}}>Subtitle</label>
              <textarea
                onChange={(e) => handleChange('subtitle', e.target.value)}
                value={module.subtitle || ''}
                style={{width: '100%', padding: '10px', border: '1px solid #e6e7eb', borderRadius: 8, fontSize: 14, minHeight: 90, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'}}
                placeholder="Enter hero subtitle"
              />
            </div>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: '700', marginBottom: 6}}>Image URL</label>
              <input
                type="text"
                onChange={(e) => handleChange('image', e.target.value)}
                value={module.image?.asset?.url || ''}
                style={{width: '100%', padding: '10px', border: '1px solid #e6e7eb', borderRadius: 8, fontSize: 14}}
                placeholder="Enter image URL"
              />
            </div>
          </>
        )}

        {moduleType === 'richTextModule' && (
          <>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 'bold', marginBottom: 4}}>Content</label>
              <textarea
                onChange={(e) => handleChange('content', e.target.value)}
                value={module.content || ''}
                style={{width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: 4, fontSize: 13, minHeight: 150}}
                placeholder="Enter rich text content"
              />
            </div>
          </>
        )}

        {moduleType === 'ctaBannerModule' && (
          <>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6}}>Heading</label>
              <input
                type="text"
                onChange={(e) => handleChange('heading', e.target.value)}
                value={module.heading || ''}
                style={{width: '100%', padding: '10px', border: '1px solid #e6e7eb', borderRadius: 8, fontSize: 14}}
                placeholder="Enter heading"
              />
            </div>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6}}>CTA Text</label>
              <input
                type="text"
                onChange={(e) => handleChange('ctaText', e.target.value)}
                value={module.ctaText || ''}
                style={{width: '100%', padding: '10px', border: '1px solid #e6e7eb', borderRadius: 8, fontSize: 14}}
                placeholder="Enter CTA button text"
              />
            </div>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6}}>CTA URL</label>
              <input
                type="text"
                onChange={(e) => handleChange('ctaUrl', e.target.value)}
                value={module.ctaUrl || ''}
                style={{width: '100%', padding: '10px', border: '1px solid #e6e7eb', borderRadius: 8, fontSize: 14}}
                placeholder="Enter CTA URL"
              />
            </div>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6}}>Background Color</label>
              <input
                type="color"
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                value={module.backgroundColor || '#3B82F6'}
                style={{width: '100%', padding: '6px', border: '1px solid #e6e7eb', borderRadius: 8, cursor: 'pointer'}}
              />
            </div>
          </>
        )}

        {moduleType === 'featuredCardsModule' && (
          <>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6}}>Number of Cards</label>
              <input
                type="number"
                onChange={(e) => handleChange('cardCount', parseInt(e.target.value))}
                value={module.cardCount || 3}
                min="1"
                max="6"
                style={{width: '100%', padding: '10px', border: '1px solid #e6e7eb', borderRadius: 8, fontSize: 14}}
              />
            </div>
            <div style={{padding: 10, backgroundColor: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#4b5563'}}>
              Note: Configure card details in Sanity document editor
            </div>
          </>
        )}

        {moduleType === 'testimonialModule' && (
          <>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6}}>Title</label>
              <input
                type="text"
                onChange={(e) => handleChange('title', e.target.value)}
                value={module.title || ''}
                style={{width: '100%', padding: '10px', border: '1px solid #e6e7eb', borderRadius: 8, fontSize: 14}}
                placeholder="Enter section title"
              />
            </div>
            <div style={{padding: 10, backgroundColor: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#4b5563'}}>
              Note: Manage testimonials in Sanity document editor
            </div>
          </>
        )}

        {moduleType === 'faqModule' && (
          <>
            <div>
              <label style={{display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6}}>Title</label>
              <input
                type="text"
                onChange={(e) => handleChange('title', e.target.value)}
                value={module.title || ''}
                style={{width: '100%', padding: '10px', border: '1px solid #e6e7eb', borderRadius: 8, fontSize: 14}}
                placeholder="Enter FAQ section title"
              />
            </div>
            <div style={{padding: 10, backgroundColor: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#4b5563'}}>
              Note: Add FAQ items in Sanity document editor
            </div>
          </>
        )}

        {!['heroModule', 'richTextModule', 'ctaBannerModule', 'featuredCardsModule', 'testimonialModule', 'faqModule'].includes(moduleType) && (
          <div style={{padding: 12, backgroundColor: '#fef3c7', borderRadius: 4, fontSize: 12, color: '#92400e'}}>
            Quick edit not available for this module type. Use Sanity document editor for full control.
          </div>
        )}
      </div>
      <div style={{paddingTop: 12, borderTop: '1px solid #f0f1f3', marginTop: 12, display: 'flex', gap: 8}}>
        <button onClick={() => { /* Save handled by parent */ }} style={{flex: 1, padding: '8px 12px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600}}>Save</button>
        <button onClick={() => { /* Close handled by parent */ }} style={{flex: 1, padding: '8px 12px', backgroundColor: 'transparent', color: '#374151', border: '1px solid #e6e7eb', borderRadius: 6}}>Close</button>
      </div>
    </div>
  )
}

export { PageBuilderToolComponent }

export default function pageBuilderPlugin() {
  return definePlugin({
    name: 'page-builder',
    tools: [
      {
        name: 'page-builder',
        title: 'Page Builder',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component: PageBuilderToolComponent as any
      }
    ]
  })
}

function PageBuilderToolComponent(props: any) {
  return (
    <DndProvider backend={HTML5Backend}>
      <PageBuilderTool />
    </DndProvider>
  )
}







