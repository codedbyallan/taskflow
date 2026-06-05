import {
    CalendarDays,
    CheckSquare,
    Folder,
    LayoutGrid,
    Settings,
    Users,
  } from 'lucide-react'
  
  function Sidebar() {
    return (
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/assets/tf-mark.png" alt="TaskFlow" />
        </div>
  
        <nav className="sidebar-nav" aria-label="Navegação principal">
          <button className="sidebar-item active" title="Dashboard">
            <LayoutGrid size={22} />
          </button>
  
          <button className="sidebar-item" title="Tarefas">
            <CheckSquare size={22} />
          </button>
  
          <button className="sidebar-item locked" title="Projetos em breve">
            <Folder size={22} />
          </button>
  
          <button className="sidebar-item locked" title="Agenda em breve">
            <CalendarDays size={22} />
          </button>
  
          <button className="sidebar-item locked" title="Equipe em breve">
            <Users size={22} />
          </button>
        </nav>
  
        <button className="sidebar-item sidebar-settings locked" title="Configurações em breve">
          <Settings size={22} />
        </button>
      </aside>
    )
  }
  
  export default Sidebar