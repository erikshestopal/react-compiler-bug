import { useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const form = useForm({ defaultValues: { customerId: "", addressId: "" } });

  // This works without the react compiler enabled.
  const customerId = form.watch("customerId");

  // This line will render with a stale customerId
  console.log("customerIdFromRender => ", customerId);

  useEffect(() => {
    const { unsubscribe } = form.watch((values, { name }) => {
      if (name === "customerId") {
        console.log("customerIdFromWatch => ", values[name]);
      }
    });
    return unsubscribe;
  }, [form]);

  return (
    <main>
      <label htmlFor="customerId">Customer ID</label>
      <input type="text" id="customerId" {...form.register("customerId")} />

      {/* Never shown because customerId always remains an empty string */}
      {customerId && (
        <fieldset>
          <label htmlFor="addressId">Address ID</label>
          <input type="text" id="addressId" {...form.register("addressId")} />
        </fieldset>
      )}
    </main>
  );
}

export default App;
