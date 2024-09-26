import {
  faAngleRight,
  faPencil,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Button from 'components/base/Button';
import PhoenixOffcanvas from 'components/base/PhoenixOffcanvas';
import AvatarDropdown from 'components/common/AvatarDropdown';
import { kanbanBoardMembers } from 'data/kanban';
import { useKanbanContext } from 'providers/KanbanProvider';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TOGGLE_DETAILS_OFFCANVAS } from 'reducers/KanbanReducer';

const actions = [
  {
    label: 'Board Setting'
  },
  {
    label: 'Duplicate Board'
  },
  {
    label: 'Manage Labels'
  },
  {
    label: 'Go to Archive'
  },
  {
    label: 'Print'
  },
  {
    label: 'Export As'
  },
  {
    label: 'Integrations'
  },
  {
    label: 'Privacy Settings'
  },
  {
    label: 'Automation'
  }
];

const KanbanBoardOffcanvas = () => {
  const { openBoardDetailsOffcanvas, kanbanDispatch } = useKanbanContext();

  const handleClose = () => {
    kanbanDispatch({
      type: TOGGLE_DETAILS_OFFCANVAS,
      payload: false
    });
  };
  return (
    <PhoenixOffcanvas
      open={openBoardDetailsOffcanvas}
      onHide={handleClose}
      className="bg-100"
      placement="end"
      fixed
      style={{ maxWidth: 445 }}
    >
      <Offcanvas.Header className="mb-6">
        <h3 className="offcanvas-title">Phoenix Kanban</h3>
        <Button className="p-1 fw-bolder" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} className="fs-8" />
        </Button>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <h4 className="text-1000 fw-semi-bold mb-3">Admins</h4>
        <div className="d-flex align-items-center gap-3 mb-5">
          <AvatarDropdown user={kanbanBoardMembers.admin} size="xl" />
          <div className="flex-1">
            <Link
              to="#!"
              className="text-decoration-none text-1000 lh-1 fw-semi-bold"
            >
              Sasha Blaus
            </Link>
            <h6 className="mb-0 lh-1 text-1000 fw-semi-bold">@potatogirl</h6>
          </div>
        </div>

        <h4 className="text-1000 fw-semi-bold mb-3">Members</h4>
        <div className="d-flex align-items-center gap-2 mb-3">
          {kanbanBoardMembers.members.map(member => (
            <AvatarDropdown user={member} size="m" key={member.id} />
          ))}
        </div>

        <h4 className="text-1000 fw-semi-bold mb-3">Guests</h4>
        <div className="d-flex align-items-center gap-2 mb-7">
          {kanbanBoardMembers.guests.map(member => (
            <AvatarDropdown user={member} size="m" key={member.id} />
          ))}
        </div>

        <div className="d-flex mb-3 border-bottom pb-3 gap-3">
          <h4 className="text-1000 fw-semi-bold mb-0">Description</h4>
          <Button className="p-0">
            <FontAwesomeIcon icon={faPencil} className="text-900 fs-9" />
          </Button>
        </div>
        <p>
          Phoenix is a rich and complex symbol that continues to capture the
          imagination of people across cultures and time periods. Whether seen
          as a symbol of hope, renewal, or mystery, the Phoenix remains an
          enduring icon of the human spirit.
        </p>

        <ul className="list-unstyled mb-0">
          {actions.map(action => (
            <li key={action.label}>
              <Link
                to="#!"
                className={classNames(
                  'text-1000 fw-semi-bold text-decoration-none d-flex flex-between-center py-3 border-bottom'
                )}
              >
                <span>{action.label}</span>
                <FontAwesomeIcon icon={faAngleRight} className="fs-9" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="#!"
              className={classNames(
                'text-1000 fw-semi-bold text-decoration-none d-flex flex-between-center text-danger pt-3'
              )}
            >
              Leave Board
            </Link>
          </li>
        </ul>
      </Offcanvas.Body>
    </PhoenixOffcanvas>
  );
};

export default KanbanBoardOffcanvas;
