package hackyeah.weather.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AlertType {

	HURRICANE("hurricane"),
	TORNADO("tornado"),
	TSUNAMI("tsunami"),
	FLOOD("flood"),
	EARTHQUAKE("earthquake"),
	DUST_STORM("duststorm"),
	HEAVY_THUNDERSTORM("thunderstorm"),
	HEAVY_SNOW("snow");


	private String code;

	AlertType(String code) {
		this.code = code;
	}

	@JsonValue
	public String getCode() {
		return code;
	}
}
