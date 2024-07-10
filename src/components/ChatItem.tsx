export default function ChatItem({
  title,
  content,
}: {
  title: string
  content: string
}) {
  return (
    <div className="chat-item-wrapper">
      <div className="avatar">x</div>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  )
}
