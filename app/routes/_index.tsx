import { Heading } from "@instructure/ui-heading";
import { View } from "@instructure/ui-view";
import Autocomplete from "../components/Autocomplete";
import type { MetaFunction } from "@vercel/remix";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { IconCheckSolid } from "@instructure/ui-icons";
import { RadioInput, RadioInputGroup } from "@instructure/ui-radio-input";

import BasicComponent from "../components/BasicComponent";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const inputs = [
    { value: "foo", label: "Radio option one" },
    { value: "bar", label: "Radio option two" },
    { value: "baz", label: "Radio option three" },
  ];
  const handleChange = function (event, value) {
    console.log(value);
  };

  return (
    <View>
      <Heading>Remix &amp; IntructureUi</Heading>

      <BasicComponent />

      {/*      <SimpleSelect renderLabel="Uncontrolled Select" id="simpleSelect">
        <SimpleSelect.Option
          id="foo"
          value="foo"
          renderBeforeLabel={(props) => {
            console.log(props);
            return <IconCheckSolid />;
          }}
        >
          Foo
        </SimpleSelect.Option>
        <SimpleSelect.Option id="bar" value="bar">
          Bar
        </SimpleSelect.Option>
        <SimpleSelect.Option id="baz" value="baz">
          Baz
        </SimpleSelect.Option>
      </SimpleSelect> */}

      {/*      <RadioInputGroup
        onChange={handleChange}
        name="example1"
        defaultValue="foo"
        description="Select something"
      >
        {inputs.map((input) => (
          <RadioInput
            key={input.value}
            value={input.value}
            label={input.label}
          />
        ))}
      </RadioInputGroup> */}

      {/*   <Autocomplete
        label="Names"
        onSelectedOptionChange={(value) => console.log(`sected ${value}`)}
        name="name"
        dataset={[
          { id: "opt0", label: "Aaron Aaronson" },
          { id: "opt1", label: "Amber Murphy" },
          { id: "opt2", label: "Andrew Miller" },
          { id: "opt3", label: "Barbara Ward" },
          { id: "opt4", label: "Byron Cranston", disabled: true },
          { id: "opt5", label: "Dennis Reynolds" },
          { id: "opt6", label: "Dee Reynolds" },
          { id: "opt7", label: "Ezra Betterthan" },
          { id: "opt8", label: "Jeff Spicoli" },
          { id: "opt9", label: "Joseph Smith" },
          { id: "opt10", label: "Jasmine Diaz" },
          { id: "opt11", label: "Martin Harris" },
          { id: "opt12", label: "Michael Morgan", disabled: true },
          { id: "opt13", label: "Michelle Rodriguez" },
          { id: "opt14", label: "Ziggy Stardust" },
        ]}
      /> */}
    </View>
  );
}
