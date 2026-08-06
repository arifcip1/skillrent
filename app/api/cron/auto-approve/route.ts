import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const seventyTwoHoursAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();

    // Query orders stuck in 'in_review' for more than 72 hours
    const { data: expiredOrders, error } = await supabase
      .from("orders")
      .select("id, client_id, freelancer_id, current_milestone_step, total_price")
      .eq("status", "in_review")
      .lt("updated_at", seventyTwoHoursAgo);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const processedOrders = [];

    if (expiredOrders && expiredOrders.length > 0) {
      for (const order of expiredOrders) {
        // Calculate partial amount (assuming 4 stages default: 25% per stage)
        const grossAmount = Math.round(order.total_price / 4);

        // Check if first order between client & freelancer for 15% vs 10% platform fee
        const { count } = await supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("client_id", order.client_id)
          .eq("freelancer_id", order.freelancer_id)
          .eq("status", "completed");

        const isFirstOrder = (count || 0) === 0;
        const feePercent = isFirstOrder ? 15.0 : 10.0;
        const feeAmount = Math.round((grossAmount * feePercent) / 100);
        const netAmount = grossAmount - feeAmount;

        // Insert released escrow transaction with auto_approved = true
        await supabase.from("escrow_transactions").insert({
          order_id: order.id,
          milestone_step: order.current_milestone_step || 1,
          gross_amount: grossAmount,
          platform_fee_percent: feePercent,
          platform_fee_amount: feeAmount,
          net_freelancer_amount: netAmount,
          status: "released",
          auto_approved: true,
          released_at: new Date().toISOString(),
        });

        // Update order status to next step or completed
        const nextStep = (order.current_milestone_step || 1) + 1;
        const isFinished = nextStep > 4;

        await supabase
          .from("orders")
          .update({
            status: isFinished ? "completed" : "in_progress",
            current_milestone_step: isFinished ? 4 : nextStep,
            updated_at: new Date().toISOString(),
          })
          .eq("id", order.id);

        processedOrders.push({
          order_id: order.id,
          step_approved: order.current_milestone_step,
          auto_approved: true,
          net_amount: netAmount,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${processedOrders.length} auto-approvals cleanly.`,
      orders: processedOrders,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Unknown error" }, { status: 500 });
  }
}
