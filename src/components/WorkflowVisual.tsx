const activities = [
  ['Client request received', '00:00', 'PT0S'],
  ['Data verified & routed', '00:04', 'PT4S'],
  ['Documents generated', '00:11', 'PT11S'],
  ['Customer served', '< 00:20', 'PT20S'],
] as const

export function WorkflowVisual() {
  return (
    <div className="workflow-card" role="group" aria-label="Illustration of an automated customer workflow">
      <div className="workflow-card__top">
        <span><i className="live-dot" /> Verified case result</span>
        <span className="mono">CSR / CASE 001</span>
      </div>
      <div className="workflow-card__metric">
        <span>AVERAGE SERVICE TIME</span>
        <strong>&lt;20<small>sec</small></strong>
        <em>From 4 minutes</em>
      </div>
      <div className="workflow-list">
        {activities.map(([label, time, dateTime], index) => (
          <div className="workflow-row" key={label}>
            <span className="workflow-index">0{index + 1}</span>
            <span>{label}</span>
            <time dateTime={dateTime}>{time}</time>
          </div>
        ))}
      </div>
      <div className="workflow-card__footer">
        <span>Previous average</span>
        <b>4m</b>
        <span>New average</span>
        <b>&lt;20s</b>
      </div>
    </div>
  )
}
