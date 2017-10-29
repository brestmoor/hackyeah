package hackyeah.weather.enums;

public enum Severity {
	HIGH("high"),
	MEDIUM("medium"),
	LOW("low");

	String severity;

	private Severity(String severity) {
		this.severity = severity;
	}
}
