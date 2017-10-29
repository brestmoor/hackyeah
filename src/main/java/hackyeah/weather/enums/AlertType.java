package hackyeah.weather.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AlertType {

	HURRICANE("hurricane"),
	TORNADO("tornado"),
	TSUNAMI("tsunami"),
	FLOOD("flood"),
	EARTHQUAKE("earthquake"),
	DUST_STORM("dust_storm"),
	HEAVY_THUNDERSTORM("heavy_thunderstorm"),
	HEAVY_SNOW("heavy_snow");


	private String code;

	AlertType(String code) {
		this.code = code;
	}

	@JsonValue
	public String getCode() {
		return code;
	}
}
