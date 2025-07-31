import { ScrollView } from "react-native";
import NewParts from "./newParts";

export default function NewComponents() {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full">
			{
				[
					"https://static.gigabyte.com/StaticFile/Image/Global/8672dbdf9d50a340b83d98d5399729ca/Product/32032/webp/1000",
					"https://www.hellotech.com/blog/wp-content/uploads/2020/02/what-is-a-gpu.jpg",
					"https://t3.ftcdn.net/jpg/04/21/88/02/360_F_421880296_IeHkMQblZwDGwPuWG2GuxWW4DAuAZA9h.jpg"
				].map((image, index) =>
					<NewParts
						key={index}
						index={index}
						image={image}
						title="Ryzen 9 9950X"
						description="16-Core - 5.7GHz"
					/>
				)
			}
		</ScrollView>
	)
}