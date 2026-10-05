import { NavMenu } from '../components/navigation/NavMenu';
import { useGNB } from '../components/navigation/GNB';
import content from '../data/content';

/**
 * ShellNav 컴포넌트
 *
 * GNB 안에서 렌더되는 메뉴. 현재 페이지(activeId)를 강조하며, 데스크탑은 가로 언더라인,
 * 모바일 드로어에서는 세로 목록으로 보여준다. 항목을 누르면 드로어가 닫힌다.
 *
 * Props:
 * @param {string} activeId - 현재 페이지에 해당하는 메뉴 id [Optional]
 * @param {function} onNavigate - 메뉴 항목 선택 핸들러 (item) => void [Required]
 *
 * Example usage:
 * <GNB navContent={ <ShellNav activeId="collection" onNavigate={ goTo } /> } />
 */
export function ShellNav({ activeId, onNavigate }) {
  const { isMobile, closeDrawer } = useGNB();

  return (
    <NavMenu
      items={ content.navigation.menuItems }
      activeId={ activeId }
      orientation={ isMobile ? 'vertical' : 'horizontal' }
      variant="underline"
      onItemClick={ (item) => {
        closeDrawer();
        onNavigate(item);
      } }
    />
  );
}
