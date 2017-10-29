package hackyeah.weather.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Severity {
	HIGH("high"),
	MEDIUM("medium"),
	LOW("low");

	String severity;

	private Severity(String severity) {
		this.severity = severity;
	}

	@JsonValue
	public String getSeverity() {
		return severity;
	}
}
