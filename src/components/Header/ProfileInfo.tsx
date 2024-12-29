import { useNavigate } from 'react-router-dom';
import '../ui/Header.css'

export const ProfileInfo = () => {
  const navigate = useNavigate()

  const toProfile = () => navigate("/profile")

  return (
    <div>
      <button className = "auth-button login-button" type = "button" onClick={toProfile}> Профиль </button>
    </div>
  )
}