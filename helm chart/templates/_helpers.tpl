{{- define "newproject.name" -}}
{{ .Chart.Name }}
{{- end }}

{{- define "newproject.fullname" -}}
{{ .Release.Name }}-{{ .Chart.Name }}
{{- end }}

{{- define "newproject.labels" -}}
app.kubernetes.io/name: {{ include "newproject.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.Version }}
{{- end }}
