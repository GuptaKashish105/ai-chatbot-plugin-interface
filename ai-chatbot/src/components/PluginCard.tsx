const PluginCard = ({ content }: { content: string }) => {
  return (
    <div className="p-3 bg-green-100 border border-green-300 rounded-lg shadow">
      <p className="text-sm text-green-900">{content}</p>
    </div>
  );
};

export default PluginCard;
