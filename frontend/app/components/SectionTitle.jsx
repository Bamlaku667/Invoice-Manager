const SectionTitle = ({ text }) => {
  return (
    <div className='border-b border-base-300 p-5'>
      <h2 className='text-2xl md:text-3xl font-medium tracking-wider capitalize'>{text}</h2>
    </div>
  );
};
export default SectionTitle;
