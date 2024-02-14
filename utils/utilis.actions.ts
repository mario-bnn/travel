export const toggleModal = () => {
    const getModal = document.querySelector('.container-modal') as HTMLDivElement;
    if (getModal) getModal.classList?.toggle('show-modal');
}