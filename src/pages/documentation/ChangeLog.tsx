import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import PhoenixDocCard from 'components/base/PhoenixDocCard';
import changelogs from 'data/changelog';
import { Link } from 'react-router-dom';

const ChangeLog = () => {
  return (
    <div>
      <h2 className="mb-4 lh-sm">Changelog</h2>

      {changelogs.map(changelog => (
        <PhoenixDocCard className="mb-4" key={changelog.title}>
          <PhoenixDocCard.Header noPreview>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2">
                  <code className="fw-bold fs-7">v{changelog.version}</code> -{' '}
                  {changelog.title}
                </h5>
                <p className="mb-0">{changelog.publishDate}</p>
              </div>
              <Button
                as={Link}
                variant="link"
                to={`/migrations/#${changelog.version}`}
                endIcon={
                  <FontAwesomeIcon icon={faChevronRight} className="fs-10" />
                }
              >
                See migration
              </Button>
            </div>
          </PhoenixDocCard.Header>
          <PhoenixDocCard.Body>
            {/* New */}
            <h6 className="d-inline-block">New</h6>
            <ul>
              {changelog.logs.new.map(file => (
                <li dangerouslySetInnerHTML={{ __html: file }} key={file} />
              ))}
            </ul>
            {/* Update */}
            {changelog.logs.update && (
              <>
                <h6 className="d-inline-block">Update</h6>
                <ul>
                  {changelog.logs.update.map(file => (
                    <li dangerouslySetInnerHTML={{ __html: file }} key={file} />
                  ))}
                </ul>
              </>
            )}

            {/* Fix */}
            <h6 className="d-inline-block">Fix</h6>
            <ul>
              {changelog.logs.fix.map(file => (
                <li dangerouslySetInnerHTML={{ __html: file }} key={file} />
              ))}
            </ul>
          </PhoenixDocCard.Body>
        </PhoenixDocCard>
      ))}

      <PhoenixDocCard className="mb-4">
        <PhoenixDocCard.Header noPreview>
          <h5 className="mb-2">
            <code className="fw-bold fs-7">v1.0.0</code> - Initial Release
          </h5>
          <p className="mb-0">11 Sep, 2023</p>
        </PhoenixDocCard.Header>
        <PhoenixDocCard.Body>
          <p className="mb-0">Nothing to see here.</p>
        </PhoenixDocCard.Body>
      </PhoenixDocCard>
    </div>
  );
};

export default ChangeLog;
