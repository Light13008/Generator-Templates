export function TopicFunction({ channels }) {
  const topicsDetails = getTopics(channels);
  let functions = '';

  topicsDetails.forEach((t) => {
    functions += `def send${t.name}(self, id):
        topic = "${t.topic}"
        self.client.publish(topic, id)\n`;
  });

  return
