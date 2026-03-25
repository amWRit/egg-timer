import OkModal from './OkModal';
function EggReadyModal({ show, onClose }: { show: boolean; onClose: () => void }) {
    if (!show) return null;

    return (
        <OkModal show={show} onClose={onClose} title="Egg is Ready!">
            <div style={{ textAlign: 'center', fontSize: '1.2rem', margin: '1em 0' }}>
                Your egg is perfectly cooked!
            </div>
        </OkModal>
    );
}

export default EggReadyModal;