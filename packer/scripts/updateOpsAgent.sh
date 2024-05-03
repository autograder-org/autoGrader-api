#!/bin/bash
# In this script we update the ops agent config file to read logs from our custom log file and perform the necessary modifications

# We need to add the following config to the specified log file path

cat > /etc/google-cloud-ops-agent/config.yaml <<-INNER_EOF
logging:
  receivers:
    my-app-receiver:
      type: files
      include_paths:
        - /tmp/webapp.log
      record_log_file_path: true
  processors:
    my-app-processor:
      type: parse_json
      time_key: time
      time_format: "%Y-%m-%dT%H:%M:%S"
    change_severity:
      type: modify_fields
      fields:
        severity:
          copy_from: jsonPayload.level
  service:
    pipelines:
      default_pipeline:
        receivers: [my-app-receiver]
        processors: [my-app-processor,change_severity]
INNER_EOF
